import React, { useState, useMemo, useEffect } from 'react';
import styles from '../Styles/Dashboard.module.css';
import type { JSX } from 'react';
// ...existing code...
// ✅ 1. Definindo os tipos para nossos dados
interface EventData {
  title: string;
  prof: string;
  time: string;
  subject: string;
}

interface Events {
  [key: string]: EventData; // Um objeto onde a chave é uma string (a data) e o valor é EventData
}

interface TooltipData {
  visible: boolean;
  content: Partial<EventData>; // O conteúdo pode estar parcialmente preenchido
  x: number;
  y: number;
}

function Dashboard() {
  // ✅ 2. Aplicando os tipos ao estado
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Events>({
    "2025-08-24": {
      title: "Prova",
      prof: "Prof.: João Neves",
      time: "19:00 às 22:00",
      subject: "Matemática para computação"
    }
  });
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData>({ visible: false, content: {}, x: 0, y: 0 });
  const [formData, setFormData] = useState<EventData>({ title: '', prof: '', time: '', subject: '' });

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
  
  const handleSaveEvent = () => {
    if (!selectedDateKey) return;
    const newEvents = { ...events };
    if (formData.title) {
      newEvents[selectedDateKey] = formData;
    } else {
      delete newEvents[selectedDateKey];
    }
    setEvents(newEvents);
    setModalOpen(false);
  };
  
  const handleDeleteEvent = () => {
    if (!selectedDateKey) return;
    const newEvents = { ...events };
    delete newEvents[selectedDateKey];
    setEvents(newEvents);
    setModalOpen(false);
  };

  // ✅ 3. Tipando os argumentos das funções
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
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateOffset = (firstDayOfMonth.getDay() + 6) % 7;
    const grid: JSX.Element[] = []; // O grid é um array de elementos JSX

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

  return (
    <>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}></header>

        <section className={styles.welcomeCard}>
            <div className={styles.welcomeText}>
                <h1>Olá, Alessandra.</h1>
                <p>Seja bem vindo(a).</p>
                <p>Supere seus desafios e trace novos objetivos.</p>
            </div>
            <div className={styles.welcomeImage}></div>
        </section>

        <section className={styles.metricsRow}>
            <div className={styles.metricCard}><div className={styles.metricIcon}><i className="fas fa-robot"></i></div><div className={styles.metricLabel}>Trupico</div></div>
            <div className={styles.metricCard}><div className={styles.metricIcon}><i className="fas fa-file-alt"></i></div><div className={styles.metricValue}>23</div><div className={styles.metricLabel}>Questões respondidas</div></div>
            <div className={styles.metricCard}><div className={styles.metricIcon}><i className="fas fa-clock"></i></div><div className={styles.metricValue}>7h</div><div className={styles.metricLabel}>Horas dedicadas</div></div>
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

export default Dashboard;