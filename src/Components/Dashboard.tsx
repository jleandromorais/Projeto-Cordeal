import React, { useState, useMemo, useEffect } from 'react';
import styles from '../Styles/Dashboard.module.css';
import type { JSX } from 'react';
import { useAuth } from '../AuthContext';
import boneco from '../assets/img/boneco.png';
import trupicoImg from '../assets/img/trupico.png';
import questoesImg from '../assets/img/questoes_respondidas.png';
import horasImg from '../assets/img/horas_dedicadas.png';

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

interface DashboardProps {
  userName: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [metrics, setMetrics] = useState({ questoesRespondidas: 0, horasDedicadas: 0 });
  const [events, setEvents] = useState<Events>({}); 
  const [notes, setNotes] = useState<string>(''); 
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData>({ visible: false, content: {}, x: 0, y: 0 });
  const [formData, setFormData] = useState<EventData>({ title: '', prof: '', time: '', subject: '' });

  // API URL from environment
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  
  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        try {
          const token = await currentUser.getIdToken();
          const authHeader = { 'Authorization': `Bearer ${token}` }; 
          const [metricsRes, eventsRes, notesRes] = await Promise.all([
            fetch(`${API_URL}/dashboard/metrics`, { headers: authHeader }),
            fetch(`${API_URL}/calendar/events`, { headers: authHeader }),
            fetch(`${API_URL}/dashboard/notes`, { headers: authHeader })
          ]);
          if (metricsRes.ok) setMetrics(await metricsRes.json());
          if (eventsRes.ok) setEvents(await eventsRes.json());
          if (notesRes.ok) {
            const notesData = await notesRes.json();
            setNotes(notesData.content || ''); 
          }
        } catch (error) { console.error("Erro ao carregar dados:", error); }
      };
      fetchData();
    }
  }, [currentUser]);

  const handleSaveNotes = async () => {
    if (!currentUser) return;
    try {
        const token = await currentUser.getIdToken();
        await fetch(`${API_URL}/dashboard/notes`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: notes })
        });
    } catch (error) { console.error(error); }
  };

  const handleMonthChange = (direction: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const handleDayClick = (dateKey: string) => {
    setSelectedDateKey(dateKey);
    setFormData(events[dateKey] || { title: '', prof: '', time: '', subject: '' });
    setModalOpen(true);
  };
  
  const handleSaveEvent = async () => {
    if (!selectedDateKey || !currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      await fetch(`${API_URL}/calendar/events`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateKey: selectedDateKey, eventData: formData })
      });
      setEvents({ ...events, [selectedDateKey]: formData });
      setModalOpen(false);
    } catch (error) { console.error(error); }
  };
  
  const handleDeleteEvent = async () => {
    if (!selectedDateKey || !currentUser) return;
    try {
        const token = await currentUser.getIdToken();
        await fetch(`${API_URL}/calendar/events/${selectedDateKey}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const newEvents = { ...events };
        delete newEvents[selectedDateKey];
        setEvents(newEvents);
        setModalOpen(false);
    } catch (error) { console.error(error); }
  };

  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const dateOffset = (firstDayOfMonth.getDay() + 6) % 7; 
    const grid: JSX.Element[] = []; 
    for (let i = 0; i < dateOffset; i++) grid.push(<div key={`empty-${i}`} className={`${styles.calendarDay} ${styles.otherMonth}`}></div>);
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const eventData = events[dateKey];
        const hasEvent = !!eventData;
        grid.push(
            <div 
                key={dateKey} 
                className={`${styles.calendarDay} ${isToday ? styles.today : ''} ${hasEvent ? styles.hasEvent : ''}`} 
                onClick={() => handleDayClick(dateKey)}
                onMouseOver={(e) => hasEvent && (
                  setTooltipData({ visible: true, content: eventData, x: e.currentTarget.getBoundingClientRect().left + window.scrollX, y: e.currentTarget.getBoundingClientRect().bottom + window.scrollY + 5 })
                )}
                onMouseOut={() => setTooltipData({ ...tooltipData, visible: false })}
            >
                {day}
            </div>
        );
    }
    return grid;
  }, [currentDate, events]);

  return (
    <div className={styles.dashboardContainer}>
        <section className={styles.welcomeCard}>
            <div className={styles.welcomeText}>
                <h1 className={styles.welcomeTitle}>Olá, {userName}.</h1>
                <p className={styles.welcomeSubtitle}>Seja bem vindo (a).</p>
                <p className={styles.welcomeDescription}>Supere seus desafios e trace novos objetivos.</p>
            </div>
            <img src={boneco} alt="Bem vindo" className={styles.welcomeImage} />
        </section>

        <section className={styles.metricsRow}>
            <div className={styles.metricCard}>
                <div className={styles.metricIconBox}><img src={trupicoImg} alt="Trupico" /></div>
                <div className={styles.metricLabelBold}>Trupico</div>
            </div>
            <div className={styles.metricCard}>
                <div className={styles.metricIconBox}><img src={questoesImg} alt="Questões" /></div>
                <div className={styles.metricValueBold}>{metrics.questoesRespondidas}</div>
                <div className={styles.metricLabelCard}>Questões respondidas</div>
            </div>
            <div className={styles.metricCard}>
                <div className={styles.metricIconBox}><img src={horasImg} alt="Horas" /></div>
                <div className={styles.metricValueBold}>{metrics.horasDedicadas}h</div>
                <div className={styles.metricLabelCard}>Horas dedicadas</div>
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
                <div className={styles.calendarGrid}>{calendarGrid}</div>
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

        {tooltipData.visible && (
            <div className={styles.eventTooltip} style={{ left: tooltipData.x, top: tooltipData.y }}>
                <p className={styles.tooltipTitle}>{tooltipData.content.title}</p>
                <p className={styles.tooltipProf}>Prof.: {tooltipData.content.prof}</p>
                <p className={styles.tooltipTime}>{tooltipData.content.time}</p>
                <p className={styles.tooltipSubject}>{tooltipData.content.subject}</p>
            </div>
        )}

        {isModalOpen && selectedDateKey && (
            <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <h3>Evento para {selectedDateKey.split('-').reverse().join('/')}</h3>
                    <div className={styles.formGroup}>
                        <label>Título</label>
                        <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Professor</label>
                        <input type="text" value={formData.prof} onChange={(e) => setFormData({...formData, prof: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Horário</label>
                        <input type="text" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Matéria</label>
                        <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                    </div>
                    <div className={styles.modalButtons}>
                        {events[selectedDateKey] && (
                            <button className={styles.deleteEventBtn} onClick={handleDeleteEvent}>Excluir</button>
                        )}
                        <button className={styles.cancelEventBtn} onClick={() => setModalOpen(false)}>Cancelar</button>
                        <button className={styles.saveEventBtn} onClick={handleSaveEvent}>Salvar</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}