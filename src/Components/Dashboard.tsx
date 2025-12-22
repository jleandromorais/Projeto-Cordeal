import React, { useState, useMemo, useEffect } from 'react';
import styles from '../Styles/Dashboard.module.css';
import type { JSX } from 'react';
import { useAuth } from '../AuthContext';
import pokemom from '../assets/img/pokemon.png';

// --- Tipos ---
interface EventData {
  title: string;
  prof: string;
  time: string;
  subject: string;
}

interface Events {
  [key: string]: EventData; 
}

interface TooltipData {
  visible: boolean;
  content: Partial<EventData>;
  x: number;
  y: number;
}

// Interface das props que vêm do componente Pai (PagDash)
interface DashboardProps {
  userName: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const { currentUser } = useAuth();

  // --- Estados ---
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Estados de dados
  const [metrics, setMetrics] = useState({ questoesRespondidas: 0, horasDedicadas: 0 });
  const [events, setEvents] = useState<Events>({}); 
  const [notes, setNotes] = useState<string>(''); 

  // Estados de UI
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData>({ visible: false, content: {}, x: 0, y: 0 });
  const [formData, setFormData] = useState<EventData>({ title: '', prof: '', time: '', subject: '' });
  
  // --- Effects ---

  // 1. Busca dados iniciais (Métricas, Eventos e Notas)
  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const authHeader = { 'Authorization': `Bearer ${token}` };
          const API_URL = 'http://localhost:3001/api'; 

          const [metricsRes, eventsRes, notesRes] = await Promise.all([
            fetch(`${API_URL}/dashboard/metrics`, { headers: authHeader }),
            fetch(`${API_URL}/calendar/events`, { headers: authHeader }),
            fetch(`${API_URL}/dashboard/notes`, { headers: authHeader })
          ]);

          if (metricsRes.ok) {
            const metricsData = await metricsRes.json();
            setMetrics(metricsData); 
          }

          if (eventsRes.ok) {
            const eventsData = await eventsRes.json();
            setEvents(eventsData); 
          }

          if (notesRes.ok) {
            const notesData = await notesRes.json();
            setNotes(notesData.content || ''); 
          }

        } catch (error) {
          console.error("Erro ao carregar dados do dashboard:", error);
        }
      };

      fetchData();
    }
  }, [currentUser]);

  // Função para salvar as notas
  const handleSaveNotes = async () => {
    if (!currentUser) return;
    try {
        const token = await currentUser.getIdToken();
        await fetch('http://localhost:3001/api/dashboard/notes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: notes })
        });
        console.log("Notas salvas com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar notas:", error);
    }
  };

  // --- Funções do Calendário ---
  const handleMonthChange = (direction: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const handleDayClick = (dateKey: string) => {
    setSelectedDateKey(dateKey);
    setModalOpen(true);
  };
  
  const handleSaveEvent = async () => {
    if (!selectedDateKey || !currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      const response = await fetch('http://localhost:3001/api/calendar/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dateKey: selectedDateKey,
          eventData: formData 
        })
      });
      if (!response.ok) throw new Error('Falha ao salvar evento no backend');
      
      const newEvents = { ...events };
      if (formData.title) {
        newEvents[selectedDateKey] = formData;
      } else {
        delete newEvents[selectedDateKey];
      }
      setEvents(newEvents);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };
  
  const handleDeleteEvent = async () => {
    if (!selectedDateKey || !currentUser) return;
    try {
        const token = await currentUser.getIdToken();
        const response = await fetch(`http://localhost:3001/api/calendar/events/${selectedDateKey}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Falha ao deletar evento no backend');
        
        const newEvents = { ...events };
        delete newEvents[selectedDateKey];
        setEvents(newEvents);
        setModalOpen(false);
    } catch (error) {
        console.error("Erro ao deletar evento:", error);
    }
  };

  const handleShowTooltip = (dayElement: HTMLElement, eventData: EventData) => {
      const rect = dayElement.getBoundingClientRect();
      setTooltipData({
          visible: true,
          content: eventData,
          x: rect.left + window.scrollX,
          y: rect.bottom + window.scrollY + 5
      });
  };

  const handleHideTooltip = () => {
      setTooltipData({ ...tooltipData, visible: false });
  };
  
  useEffect(() => {
    if (isModalOpen && selectedDateKey) {
        setFormData(events[selectedDateKey] || { title: '', prof: '', time: '', subject: '' });
    }
  }, [isModalOpen, selectedDateKey, events]);

  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const dateOffset = (firstDayOfMonth.getDay() + 6) % 7; 

    const grid: JSX.Element[] = []; 
    
    for (let i = 0; i < dateOffset; i++) {
        grid.push(<div key={`empty-${i}`} className={`${styles.calendarDay} ${styles.otherMonth}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const eventData = events[dateKey];
        const hasEvent = !!eventData;
        const dayClasses = [
            styles.calendarDay,
            isToday ? styles.today : '',
            hasEvent ? styles.hasEvent : ''
        ].join(' ');
        
        grid.push(
            <div 
                key={dateKey} 
                className={dayClasses} 
                onClick={() => handleDayClick(dateKey)}
                onMouseOver={(e) => hasEvent && handleShowTooltip(e.currentTarget, eventData)}
                onMouseOut={() => hasEvent && handleHideTooltip()}
            >
                {day}
            </div>
        );
    }
    return grid;
  }, [currentDate, events]);

  // --- JSX (Renderização) ---
  return (
    <>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}></header>

        <section className={styles.welcomeCard}>
            <div className={styles.welcomeText}>
                <h1>Olá, {userName}.</h1>
                <p>Seja bem vindo(a).</p>
                <p>Supere seus desafios e trace novos objetivos.</p>
            </div>
           <img 
                src={pokemom} 
                alt="Bem vindo" 
                className={styles.welcomeImage} 
            />
        </section>

        <section className={styles.metricsRow}>
            <div className={styles.metricCard}>
                <div className={styles.metricIcon}><i className="fas fa-robot"></i></div>
                <div className={styles.metricLabel}>Trupico</div>
            </div>
            <div className={styles.metricCard}>
                <div className={styles.metricIcon}><i className="fas fa-file-alt"></i></div>
                <div className={styles.metricValue}>{metrics.questoesRespondidas}</div>
                <div className={styles.metricLabel}>Questões respondidas</div>
            </div>
            <div className={styles.metricCard}>
                <div className={styles.metricIcon}><i className="fas fa-clock"></i></div>
                <div className={styles.metricValue}>{metrics.horasDedicadas}h</div>
                <div className={styles.metricLabel}>Horas dedicadas</div>
            </div>
        </section>

        <div className={styles.contentArea}>
            <div className={styles.calendarWidget}>
                <div className={styles.calendarNav}>
                    <button onClick={() => handleMonthChange(-1)}><i className="fas fa-chevron-left"></i></button>
                    <h3>{currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h3>
                    <button onClick={() => handleMonthChange(1)}><i className="fas fa-chevron-right"></i></button>
                </div>
                <div className={styles.calendarHeader}>
                    <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
                </div>
                <div className={styles.calendarGrid}>
                    {calendarGrid}
                </div>
            </div>

            <div className={styles.notesWidget}>
                <div className={styles.notesHeader}><h3>Minhas Anotações</h3></div>
                <textarea 
                    className={styles.notesContent} 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={handleSaveNotes}
                    placeholder="Escreva suas anotações aqui..."
                />
            </div>
        </div>
      </div>

      {/* --- O CHAT FOI REMOVIDO DAQUI --- */}

      {/* Tooltip */}
      {tooltipData.visible && (
        <div className={styles.eventTooltip} style={{ left: tooltipData.x, top: tooltipData.y }}>
            <p className={styles.tooltipTitle}>{tooltipData.content.title}</p>
            <p className={styles.tooltipProf}>{tooltipData.content.prof}</p>
            <p className={styles.tooltipTime}>{tooltipData.content.time}</p>
            <p className={styles.tooltipSubject}>{tooltipData.content.subject}</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedDateKey && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h3>Evento para {selectedDateKey.split('-').reverse().join('/')}</h3>
                <div className={styles.formGroup}>
                    <label htmlFor="event-title">Título</label>
                    <input type="text" id="event-title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Ex: Prova" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="event-prof">Professor</label>
                    <input type="text" id="event-prof" value={formData.prof} onChange={(e) => setFormData({...formData, prof: e.target.value})} placeholder="Ex: Prof. João Neves" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="event-time">Horário</label>
                    <input type="text" id="event-time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} placeholder="Ex: 19:00 às 22:00" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="event-subject">Matéria/Descrição</label>
                    <input type="text" id="event-subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Ex: Matemática para computação" />
                </div>
                <div className={styles.modalButtons}>
                    {events[selectedDateKey] && <button className={styles.deleteEventBtn} onClick={handleDeleteEvent}>Excluir</button>}
                    <button className={styles.cancelEventBtn} onClick={() => setModalOpen(false)}>Cancelar</button>
                    <button className={styles.saveEventBtn} onClick={handleSaveEvent}>Salvar</button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}