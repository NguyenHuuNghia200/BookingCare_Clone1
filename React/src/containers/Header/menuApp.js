export const adminMenu = [
    { //Quan li nguoi dung
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/admin-manage'

            },


        ]
    },
    { //Quan li phong kham
        name: 'menu.admin.clinic',
        menus: [

            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
                // subMenus: [
                //     { name: 'menu.', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },


        ]
    },
    { //Quan li chuyen khoa
        name: 'menu.admin.specialty',
        menus: [

            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
                // subMenus: [
                //     { name: 'menu.', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },


        ]
    },
    { //Quan li cam nang 
        name: 'menu.admin.handbook',
        menus: [

            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
                // subMenus: [
                //     { name: 'menu.', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },


        ]
    },
];