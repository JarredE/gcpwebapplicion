const Users = require('./Users')

module.exports = (sequelize, Sequelize) => {
	const Referral = sequelize.define('referral', {	
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    referrer_fname: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_lname: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_fullname: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_email: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_phone: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_provider: {
		type: Sequelize.STRING,
        allowNull: true,
	},
    referrer_agency: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_agencyzip: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_notification: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    referrer_nearest_loc: {
		type: Sequelize.STRING,
        allowNull: false,
	},
	student_initials: {
		type: Sequelize.STRING,
        allowNull: false,
	},
	student_agency: {
		type: Sequelize.STRING,
        allowNull: false,
  	},
	student_agency_zip: {
		type: Sequelize.STRING,
        allowNull: true,
	},
	relation: {
		type: Sequelize.STRING,
        allowNull: false,
    },
    hr_teacher: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    grade_level: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ethnicity: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    living_status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    living_status_note: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    background: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    style_pref: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    size_type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pant_size: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: false,
    },
    pant_waist: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    top_size: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    outfit_combo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bottom_color: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    top_colors: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    bra_info: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    underwear: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    shoe_size: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    socks: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hygiene_kit: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    hygiene_items: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    feminine_hygiene: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    school_supplies: {
        type: Sequelize.STRING,
        defaultValue: "N/A",
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "UNASSIGNED",
        allowNull: false,
    },
    status_note: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    volunteer: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    volunteer_user: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    referrer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
    }
	});

    // Referral.belongsTo(Users);
    // Users.hasMany(Referral);
	return Referral;
}
