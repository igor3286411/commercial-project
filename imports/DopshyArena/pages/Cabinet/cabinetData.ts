export enum CabinetRouteTypes {
    masterAdmin = 'master-admin',
    client = 'client',
    trainer = 'trainer',
    admin = 'admin',
    parent = 'parent',
    student = 'student'
}

export interface CabinetRouteButton {
    text: string,
    route: string
}

export interface CabinetRoute {
    userType?: CabinetRouteTypes,
    route?: boolean,
    buttons: CabinetRouteButton[]
}

export const getCabinetRoutesById = (userId?: string, route?: string) => {
    const cabinetRoutes: CabinetRoute[] = [
        {
            userType: CabinetRouteTypes.admin, // type: 'admin'
            buttons: [
                {
                    text: 'Административная часть',
                    route: '/admin-panel'
                },
                {
                    text: 'Аналитика клиентов',
                    route: ''
                },
                {
                    text: 'Аналитика сотрудников',
                    route: '/attendance-trainers'
                },
                {
                    text: 'Посещаемость',
                    route: '/attendance'
                },
                {
                    text: 'Платежи',
                    route: '/payments'
                },
                {
                    text: 'Игрок',
                    route: ''
                },
                {
                    text: '**Общая статистика (мастер-админ)**',
                    route: '/statistics'
                },
            ]
        },
        {
            userType: CabinetRouteTypes.masterAdmin, // type: 'master-admin '
            buttons: [
                {
                    text: 'Посещаемость',
                    route: '/attendance'
                },
                {
                    text: 'Платежи',
                    route: ''
                },
                {
                    text: 'Аналитика сотрудников',
                    route: ''
                },
                {
                    text: 'Аналитика клиентов',
                    route: ' /admin-panel/settings'
                },
                {
                    text: 'Настройки',
                    route: ''
                },
            ],
        },
        {
            userType: CabinetRouteTypes.parent, // type: 'parent'
            buttons: [
                {
                    text: 'Данные',
                    route: `/edit_info/${userId}`
                },
                {
                    text: 'Прогресс',
                    route: '/progress'
                },
                {
                    text: 'Дети',
                    route: '/children'
                },
                {
                    text: 'Посещаемость',
                    route: ''
                },
                {
                    text: 'Платежи',
                    route: ''
                },
                {
                    text: 'Тренер',
                    route: ''
                },
                {
                    text: 'Отправить в архив',
                    route: ''
                },
            ],
        },
        {
            userType: CabinetRouteTypes.trainer, // type: 'trainer'
            buttons: [
                {
                    text: 'Мои группы',
                    route: `/groups/${userId}`
                },
                {
                    text: 'Посещаемость (своя)',
                    route: `/attendance-trainer/${userId}`
                },
                {
                    text: 'Посещаемость групп',
                    route: `/attendance/${userId}`
                },
                {
                    text: 'Настройки',
                    route: ``
                },
                // {
                //     text: 'О себе',
                //     route: `/user_bio`
                // },
                {
                    text: 'Данные',
                    route: `/edit_info/${userId}`
                },
                {
                    text: 'Аналитика клиентов',
                    route: `/client_analytics`
                },
                {
                    text: 'Дети',
                    route: `/child_analytics`
                },
            ],
        },
        {
            route: route === 'children', // type: 'student'
            buttons: [
                {
                    text: 'Прогресс',
                    route: '/progress'
                },
                {
                    text: 'Посещаемость',
                    route: `/attendance/${userId}`
                },
                {
                    text: 'Платежи',
                    route: `/payments/${userId}`
                },
                {
                    text: 'Комментарий от тренера',
                    route: ''
                },
                {
                    text: 'Дата пробной тренировки',
                    route: ''
                },
                {
                    text: 'Данные',
                    route: `/edit_info/${userId}`
                },

            ],
        },
    ]
    return cabinetRoutes;
}