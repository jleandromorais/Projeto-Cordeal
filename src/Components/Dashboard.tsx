import React, { useState, useMemo, useEffect } from 'react';
import styles from '../Styles/Dashboard.module.css';
import type { JSX } from 'react';

// 1. Importar o useAuth para saber quem está logado
import { useAuth } from '../AuthContext'; 

// --- Tipos (iguais ao original) ---
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
// --- Fim dos Tipos ---

// ✅ ALTERAÇÃO 1: Mudamos o nome da função
// Adicionamos "const" e mudamos para "React.FC"
export const Dashboard: React.FC = () => {
  // 2. Pegar o utilizador atual do AuthContext
  const { currentUser } = useAuth();

  // --- Estados ---
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // 3. Estados que agora vêm do backend (começam vazios)
  const [userName, setUserName] = useState<string>("..."); // Para o "Olá, ..."
  const [metrics, setMetrics] = useState({ questoesRespondidas: 0, horasDedicadas: 0 });
  const [events, setEvents] = useState<Events>({}); // Começa vazio
  
  // Estados de UI (iguais ao original)
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData>({ visible: false, content: {}, x: 0, y: 0 });
  const [formData, setFormData] = useState<EventData>({ title: '', prof: '', time: '', subject: '' });
  // --- Fim dos Estados ---

  // 4. useEffect para carregar TODOS os dados da API quando o componente montar
  useEffect(() => {
    // Só roda se o utilizador estiver logado
    if (currentUser) {
      const fetchData = async () => {
        try {
          // Pega o Token de Autenticação do utilizador logado
          const token = await currentUser.getIdToken();
          const authHeader = {
            'Authorization': `Bearer ${token}`
          };

          // URL base da sua API Node.js
          const API_URL = 'http://localhost:3001/api'; 

          // Busca todos os dados em paralelo
          const [userRes, metricsRes, eventsRes] = await Promise.all([
            fetch(`${API_URL}/user/me`, { headers: authHeader }),
            fetch(`${API_URL}/dashboard/metrics`, { headers: authHeader }),
            fetch(`${API_URL}/calendar/events`, { headers: authHeader })
          ]);

          // Processa os dados do utilizador
          if (!userRes.ok) throw new Error('Falha ao buscar dados do utilizador');
          const userData = await userRes.json();
          setUserName(userData.nome || 'Utilizador'); // Salva o nome

          // Processa as métricas
          if (!metricsRes.ok) throw new Error('Falha ao buscar métricas');
          const metricsData = await metricsRes.json();
          setMetrics(metricsData); // Salva as métricas

          // Processa os eventos
          if (!eventsRes.ok) throw new Error('Falha ao buscar eventos');
          const eventsData = await eventsRes.json();
          setEvents(eventsData); // Salva os eventos

        } catch (error) {
          console.error("Erro ao carregar dados do dashboard:", error);
          // Aqui você pode definir um estado de erro para mostrar ao utilizador
        }
      };

      fetchData();
    }
  }, [currentUser]); // Esta função roda sempre que 'currentUser' for definido


  // --- Funções de Controlo do Calendário ---

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
  
  // 5. ATUALIZADO: Salva o evento no backend
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
          eventData: formData // Envia os dados do formulário
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar evento no backend');
      }

      // Atualiza o estado local para o ecrã mudar imediatamente
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
  
  // 6. ATUALIZADO: Deleta o evento no backend
  const handleDeleteEvent = async () => {
    if (!selectedDateKey || !currentUser) return;

    try {
        const token = await currentUser.getIdToken();
        // Nota: O seu backend Node.js precisa ter esta rota DELETE
        // ex: app.delete('/api/calendar/events/:dateKey', checkAuth, ...)
        const response = await fetch(`http://localhost:3001/api/calendar/events/${selectedDateKey}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao deletar evento no backend');
        }
        
        // Atualiza o estado local
        const newEvents = { ...events };
        delete newEvents[selectedDateKey];
        setEvents(newEvents);
        setModalOpen(false);
        
    } catch (error) {
        console.error("Erro ao deletar evento:", error);
    }
  };

  // Funções de Tooltip (iguais ao original)
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
  
  // useEffect do Modal (igual ao original)
  useEffect(() => {
    if (isModalOpen && selectedDateKey) {
        // Preenche o formulário com os dados do evento clicado
        setFormData(events[selectedDateKey] || { title: '', prof: '', time: '', subject: '' });
    }
  }, [isModalOpen, selectedDateKey, events]);

  // calendarGrid (igual ao original, pois já depende do estado 'events')
  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
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

        {/* 7. ATUALIZADO: O JSX agora usa os estados preenchidos pela API */}
        <section className={styles.welcomeCard}>
            <div className={styles.welcomeText}>
                {/* O nome 'userName' agora vem do backend */}
                <h1>Olá, {userName}.</h1>
                <p>Seja bem vindo(a).</p>
                <p>Supere seus desafios e trace novos objetivos.</p>
            </div>
            <div className={styles.welcomeImage}></div>
        </section>

        <section className={styles.metricsRow}>
            <div className={styles.metricCard}><div className={styles.metricIcon}><i className="fas fa-robot"></i></div><div className={styles.metricLabel}>Trupico</div></div>
            <div className={styles.metricCard}>
                <div className={styles.metricIcon}><i className="fas fa-file-alt"></i></div>
                {/* As métricas agora vêm do backend */}
                <div className={styles.metricValue}>{metrics.questoesRespondidas}</div>
                <div className={styles.metricLabel}>Questões respondidas</div>
            </div>
            <div className={styles.metricCard}>
                <div className={styles.metricIcon}><i className="fas fa-clock"></i></div>
                <div className={styles.metricValue}>{metrics.horasDedicadas}h</div>
                <div className={styles.metricLabel}>Horas dedicadas</div>
            </div>
        </section>

        {/* O resto do JSX (calendário, notas, modal) continua igual, 
           pois já depende dos estados que agora são preenchidos pela API */}

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
          _       </div>
            </div>
            <div className={styles.notesWidget}>
                <div className={styles.notesHeader}><h3>Minhas Anotações</h3></div>
                <div className={styles.notesContent} contentEditable="true"></div>
            </div>
        </div>
      </div>

      <button className={styles.fab}><i className="fas fa-comment"></i></button>
      
      {tooltipData.visible && (
        <div className={styles.eventTooltip} style={{ left: tooltipData.x, top: tooltipData.y }}>
            <p className={styles.tooltipTitle}>{tooltipData.content.title}</p>
            <p className={styles.tooltipProf}>{tooltipData.content.prof}</p>
            <p className={styles.tooltipTime}>{tooltipData.content.time}</p>
            <p className={styles.tooltipSubject}>{tooltipData.content.subject}</p>
        </div>
    )}

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
            D <div className={styles.formGroup}>
                    <label htmlFor="event-subject">Matéria/Descrição</label>
                    <input type="text" id="event-subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Ex: Matemática para computação" />
                </div>
                <div className={styles.modalButtons}>
  á                 {/* Botões que chamam as novas funções de salvar/deletar */}
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

// ✅ ALTERAÇÃO 2: Removemos o export default
// export default Dashboard;