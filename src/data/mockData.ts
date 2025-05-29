
export const mockData = {
  employees: [
    {
      id: '1',
      name: 'Иван Петров',
      position: 'Конструктор',
      department: 'Конструкторский отдел',
      age: 32,
      salary: 65000,
      patents: 3,
      projects: ['Проект А', 'Проект Б']
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      position: 'Инженер',
      department: 'Инженерный отдел',
      age: 28,
      salary: 55000,
      patents: 1,
      projects: ['Проект В']
    },
  ],
  departments: [
    {
      id: '1',
      name: 'Конструкторский отдел',
      head: 'Алексей Иванов',
      employeesCount: 15,
      budget: 2500000,
      equipment: ['CAD-станция', 'Плоттер']
    },
    {
      id: '2',
      name: 'Инженерный отдел',
      head: 'Елена Петрова',
      employeesCount: 12,
      budget: 1800000,
      equipment: ['Измерительные приборы']
    },
  ],
  equipment: [
    {
      id: '1',
      name: 'CAD-станция Pro',
      type: 'Программное обеспечение',
      status: 'В работе',
      department: 'Конструкторский отдел',
      cost: 150000
    },
    {
      id: '2',
      name: 'Измерительный комплекс',
      type: 'Измерительное оборудование',
      status: 'Свободно',
      department: 'Общее',
      cost: 300000
    },
  ],
  contracts: [
    {
      id: '1',
      title: 'Договор с ООО "Технострой"',
      client: 'ООО "Технострой"',
      cost: 5000000,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      status: 'В работе'
    },
    {
      id: '2',
      title: 'Договор с АО "Промышленник"',
      client: 'АО "Промышленник"',
      cost: 3500000,
      startDate: '2024-03-01',
      endDate: '2024-11-30',
      status: 'В работе'
    },
  ],
  projects: [
    {
      id: '1',
      title: 'Проект модернизации завода',
      manager: 'Иван Петров',
      status: 'В разработке',
      budget: 2000000,
      startDate: '2024-02-01',
      endDate: '2024-08-31'
    },
    {
      id: '2',
      title: 'Проект автоматизации линии',
      manager: 'Мария Сидорова',
      status: 'Планирование',
      budget: 1500000,
      startDate: '2024-04-01',
      endDate: '2024-10-31'
    },
  ],
  subcontractors: [
    {
      id: '1',
      name: 'ООО "СпецМонтаж"',
      specialization: 'Монтажные работы',
      rating: 4.5,
      contact: '+7 (495) 123-45-67',
      projects: ['Проект модернизации завода']
    },
    {
      id: '2',
      name: 'АО "ЭлектроСервис"',
      specialization: 'Электромонтажные работы',
      rating: 4.8,
      contact: '+7 (495) 987-65-43',
      projects: ['Проект автоматизации линии']
    },
  ]
};
