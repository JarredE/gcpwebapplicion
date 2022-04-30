const express = require("express");
const router = express.Router();
const cors = require("cors");
const { referral, Sequelize } = require("../models");
const { Op } = require("sequelize");
var bodyParser = require('body-parser');
const { sequelize } = require("sequelize");
var jsonParser = bodyParser.json();

router.post("/", async (req, res) => {
    const { referrer_fname, referrer_lname, referrer_fullname, referrer_email, referrer_phone, referrer_provider, referrer_agency, referrer_agencyzip, student_initials, student_agency, student_agency_zip, relation, hr_teacher, grade_level, gender, 
        referrer_notification, referrer_nearest_loc, ethnicity, living_status, living_status_note, background, style_pref, size_type, pant_size, pant_waist, top_size,
        outfit_combo, bottom_color, top_colors, bra_info, underwear, shoe_size, socks, hygiene_kit, hygiene_items,
        feminine_hygiene, school_supplies, status, status_note, volunteer, volunteer_user, referrer  } = req.body;
        referral.create({
        referrer_fname: referrer_fname,
        referrer_lname: referrer_lname,
        referrer_fullname: referrer_fullname,
        referrer_email: referrer_email,
        referrer_phone: referrer_phone,
        referrer_provider: referrer_provider,
        referrer_agency: referrer_agency,
        referrer_agencyzip: referrer_agencyzip,
        referrer_notification: referrer_notification,
        referrer_nearest_loc: referrer_nearest_loc,
        student_initials: student_initials,
	    student_agency: student_agency,
	    student_agency_zip: student_agency_zip,
	    relation: relation,
        hr_teacher: hr_teacher, 
        grade_level: grade_level,
        gender: gender,
        ethnicity: ethnicity,
        living_status: living_status,
        living_status_note: living_status_note,
        background: background,
        style_pref: style_pref,
        size_type: size_type,
        pant_size: pant_size,
        pant_waist: pant_waist,
        top_size: top_size,
        outfit_combo: outfit_combo,
        bottom_color: bottom_color,
        top_colors: top_colors,
        bra_info: bra_info,
        underwear:underwear,
        shoe_size: shoe_size,
        socks: socks,
        hygiene_kit: hygiene_kit,
        hygiene_items: hygiene_items,
        feminine_hygiene: feminine_hygiene,
        school_supplies: school_supplies,
        status: status,
        status_note: status_note,
        volunteer: volunteer,
        volunteer_user: volunteer_user,
        referrer: referrer,
      });
      res.json("SUCCESS");
  });

  router.get('/', async (req, res) => {
    try{
      referral.findAll({attributes: ['id', 'referrer_fname', 'referrer_lname', 'referrer_email', 'referrer_phone', 'referrer_agency', 
      'referrer_agencyzip', 'referrer_nearest_loc', 'referrer_notification', 'student_initials', 'student_agency', 'student_agency_zip', 'relation', 'hr_teacher', 'grade_level', 'gender', 
      'ethnicity', 'living_status', 'living_status_note', 'background', 'style_pref', 'size_type', 'pant_size', 'top_size',
    'outfit_combo', 'bottom_color', 'top_colors', 'bra_info', 'underwear', 'shoe_size', 'socks', 'hygiene_kit', 'hygiene_items',
'feminine_hygiene', 'school_supplies', 'status', 'status_note', 'volunteer', 'referrer']})
      .then(referrals => {
          res.status(200).json(referrals);
      })
  }catch(error) {
      // log on console
      console.log(error);

      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
});

//count all fulfilled referrals for january
router.get('/jan', async (req, res) => {
const currentYear = new Date().getFullYear();
  const startDate = new Date( currentYear + "-01-01 00:00:00");
const endDate = new Date(currentYear + "-01-31 00:00:00");

  try{
    referral.findAndCountAll({attributes: ['createdAt'],
    where: { 
      status: {
        [Op.like]: 'FULFILLED'
      },
      updatedAt: {
            [Op.between]: [startDate, endDate]
        }
    }
  })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

//count all fulfilled referrals for feb
router.get('/feb', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-02-01 00:00:00");
  const endDate = new Date(currentYear + "-02-29 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for mar
router.get('/mar', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-03-01 00:00:00");
  const endDate = new Date(currentYear + "-03-31 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for apr
router.get('/apr', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-04-01 00:00:00");
  const endDate = new Date(currentYear + "-04-30 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for may
router.get('/may', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-05-01 00:00:00");
  const endDate = new Date(currentYear + "-05-31 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for jun
router.get('/jun', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-06-01 00:00:00");
  const endDate = new Date(currentYear + "-06-30 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for jul
router.get('/jul', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-07-01 00:00:00");
  const endDate = new Date(currentYear + "-07-31 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for aug
router.get('/aug', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-08-01 00:00:00");
  const endDate = new Date(currentYear + "-08-31 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for sep
router.get('/sep', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-09-01 00:00:00");
  const endDate = new Date(currentYear + "-09-30 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for oct
router.get('/oct', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-10-01 00:00:00");
  const endDate = new Date(currentYear + "-10-31 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for nov
router.get('/nov', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-11-01 00:00:00");
  const endDate = new Date(currentYear + "-11-30 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  //count all fulfilled referrals for dec
router.get('/dec', async (req, res) => {
  const currentYear = new Date().getFullYear();
    const startDate = new Date( currentYear + "-12-01 00:00:00");
  const endDate = new Date(currentYear + "-12-31 00:00:00");
  
    try{
      referral.findAndCountAll({attributes: ['createdAt'],
      where: { 
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
              [Op.between]: [startDate, endDate]
          }
      }
    })
      .then(referrals => {
          res.status(200).json(referrals.count);
      })
  }catch(error) {
      // log on console
      console.log(error);
  
      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
  });

  

router.get('/search/:query', async (req, res) => {
  const Op=Sequelize.Op;
  try{
    const queryFilter=req.params.query;
   
  referral.findAll(
 { attributes: ['id', 'referrer_fname', 'referrer_lname', 'referrer_email', 'status', 'student_initials', 'volunteer'],
  where: {
    status: {
      [Op.not]: 'FULFILLED'
    },
    [Op.or]: [
    {id: { [Op.like]: `%${queryFilter}%` }},
    {referrer_fullname: { [Op.like]: `%${queryFilter}%` }},
    {referrer_email: { [Op.like]: `%${queryFilter}%` }},
    {status: { [Op.like]: `%${queryFilter}%` }},
    {volunteer: { [Op.like]: `%${queryFilter}%` }},
    ]
    }
 })
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});
//fulfilled table search
router.get('/archive/search/:query', async (req, res) => {
  const Op=Sequelize.Op;
  try{
    const queryFilter=req.params.query;
   
  referral.findAll(
 { attributes: ['id', 'referrer_fname', 'referrer_lname', 'referrer_email', 'status', 'student_initials', 'volunteer'],
  where: {
    status: {
      [Op.like]: 'FULFILLED'
    },
    updatedAt: {
      [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
    },
    [Op.or]: [
    {id: { [Op.like]: `%${queryFilter}%` }},
    {referrer_fullname: { [Op.like]: `%${queryFilter}%` }},
    {referrer_email: { [Op.like]: `%${queryFilter}%` }},
    {volunteer: { [Op.like]: `%${queryFilter}%` }},
    ]
    }
 })
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

//referrer table search
router.get('/submitted/search/:referrer/:query', async (req, res) => {
  const Op=Sequelize.Op;

  try{
    const queryFilter=req.params.query
    const referrer=req.params.referrer
   
  referral.findAll(
 { attributes: ['id', 'student_initials', 'status', 'volunteer'],
  where: {
    referrer: referrer,
        [Op.or]: [
          {id: { [Op.like]: `%${queryFilter}%` }},
          {student_initials: { [Op.like]: `%${queryFilter}%` }},
          {volunteer: { [Op.like]: `%${queryFilter}%` }},
          {status: { [Op.like]: `%${queryFilter}%` }},
          ]
    }
 }
  )
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

//assigned table search
router.get('/assigned/search/:volunteer_user/:query', async (req, res) => {
  const Op=Sequelize.Op;

  try{
    const queryFilter=req.params.query
    const volunteer_user=req.params.volunteer_user
   
  referral.findAll(
 { attributes: ['id', 'referrer_fname', 'referrer_lname', 'student_initials', 'referrer_email', 'status'],
  where: {
    volunteer_user: volunteer_user,
        status: {
          [Op.not]: 'FULFILLED'
        },
        [Op.or]: [
          {id: { [Op.like]: `%${queryFilter}%` }},
          {referrer_fullname: { [Op.like]: `%${queryFilter}%` }},
          {referrer_email: { [Op.like]: `%${queryFilter}%` }},
          {status: { [Op.like]: `%${queryFilter}%` }},
          ]
    }
 }
  )
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get("/referralinfo/:id", async (req, res) => {
    const id = req.params.id;
    referral.findOne({ where: { id: id } }).then(referrals=>{
      res.json(referrals);
    });
  
  });

router.get('/queue', async (req, res) => {
    try{
      referral.findAll({ 
        where: {
          status: {
            [Op.not]: 'FULFILLED'
          }

        } 
      })
      .then(referrals => {
          res.status(200).json(referrals);
      })
  }catch(error) {
      // log on console
      console.log(error);

      res.status(500).json({
          message: "Error!",
          error: error
      });
  }
});

//get all fulfilled
router.get('/archive', async (req, res) => {
  try{
    referral.findAll({ 
      where: {
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

//count all fulfilled
router.get('/archive/count', async (req, res) => {
  try{
    referral.findAndCountAll({ 
      where: {
        status: {
          [Op.like]: 'FULFILLED'
        },
        updatedAt: {
          [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/reportgen', async (req, res) => {
  try{
    referral.findAll({ 
      where: {
        status: {
          [Op.like]: 'FULFILLED'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/assigned',cors(),jsonParser, async (req, res) => {
  const volunteer_user = req.query.volunteer_user;
  try{
    referral.findAll({ 
      where: {
        volunteer_user: volunteer_user,
        status: {
          [Op.not]: 'FULFILLED'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/submitted',cors(),jsonParser, async (req, res) => {
  const referrer = req.query.referrer;
  try{
    referral.findAll({ 
      where: {
        referrer: referrer
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/awaiting',cors(),jsonParser, async (req, res) => {
  const referrer = req.query.referrer;
  try{
    referral.findAll({ 
      where: {
        referrer: referrer,
        status: "AWAITING PICKUP"
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

//counts

router.get('/unassignedCount', async (req, res) => {
  try{
    referral.findAndCountAll({ 
      where: {
        status: {
          [Op.like]: 'UNASSIGNED'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/onHoldCount', async (req, res) => {
  try{
    referral.findAndCountAll({ 
      where: {
        status: {
          [Op.like]: 'ON HOLD'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/inProgressCount', async (req, res) => {
  try{
    referral.findAndCountAll({ 
      where: {
        status: {
          [Op.like]: 'IN PROGRESS'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/awaitingPickupCount', async (req, res) => {
  try{
    referral.findAndCountAll({ 
      where: {
        status: {
          [Op.like]: 'AWAITING PICKUP'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/assignedOnHoldCount',cors(),jsonParser, async (req, res) => {
  const volunteer_user = req.query.volunteer_user;
  try{
    referral.findAndCountAll({ 
      where: {
        volunteer_user: volunteer_user,
        status: {
          [Op.like]: 'ON HOLD'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/assignedInProgressCount',cors(),jsonParser, async (req, res) => {
  const volunteer_user = req.query.volunteer_user;
  try{
    referral.findAndCountAll({ 
      where: {
        volunteer_user: volunteer_user,
        status: {
          [Op.like]: 'IN PROGRESS'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/assignedAwaitingPickupCount',cors(),jsonParser, async (req, res) => {
  const volunteer_user = req.query.volunteer_user;
  try{
    referral.findAndCountAll({ 
      where: {
        volunteer_user: volunteer_user,
        status: {
          [Op.like]: 'AWAITING PICKUP'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/submittedOnHold',cors(),jsonParser, async (req, res) => {
  const referrer = req.query.referrer;
  try{
    referral.findAndCountAll({ 
      where: {
        referrer: referrer,
        status: {
          [Op.like]: 'ON HOLD'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/submittedInProgress',cors(),jsonParser, async (req, res) => {
  const referrer = req.query.referrer;
  try{
    referral.findAndCountAll({ 
      where: {
        referrer: referrer,
        status: {
          [Op.like]: 'IN PROGRESS'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

router.get('/submittedAwaitingPickup',cors(),jsonParser, async (req, res) => {
  const referrer = req.query.referrer;
  try{
    referral.findAndCountAll({ 
      where: {
        referrer: referrer,
        status: {
          [Op.like]: 'AWAITING PICKUP'
        }
      } 
    })
    .then(referrals => {
        res.status(200).json(referrals.count);
    })
}catch(error) {
    // log on console
    console.log(error);

    res.status(500).json({
        message: "Error!",
        error: error
    });
}
});

//update referral
  router.put("/updateReferral/:id", async (req, res) => {
    const id = req.params.id;
    const { referrer_fname, referrer_lname, referrer_email, referrer_phone, referrer_provider, referrer_agency, referrer_agencyzip, student_initials, student_agency, student_agency_zip, relation, hr_teacher, grade_level, gender, 
      referrer_notification, referrer_nearest_loc, ethnicity, living_status, living_status_note, background, style_pref, size_type,pant_waist, pant_size, top_size,
      outfit_combo, bottom_color, top_colors, bra_info, underwear, shoe_size, socks, hygiene_kit, hygiene_items,
      feminine_hygiene, school_supplies, status, status_note, volunteer, volunteer_user, referrer  } = req.body;
    const referrals = await referral.findOne({ where: { id: id } });
      
        referral.update(
          { referrer_fname: referrer_fname,
            referrer_lname: referrer_lname,
            referrer_email: referrer_email,
            referrer_phone: referrer_phone,
            referrer_provider: referrer_provider,
            referrer_agency: referrer_agency,
            referrer_agencyzip: referrer_agencyzip,
            referrer_notification: referrer_notification,
            referrer_nearest_loc: referrer_nearest_loc,
            student_initials: student_initials,
          student_agency: student_agency,
          student_agency_zip: student_agency_zip,
          relation: relation,
            hr_teacher: hr_teacher, 
            grade_level: grade_level,
            gender: gender,
            ethnicity: ethnicity,
            living_status: living_status,
            living_status_note: living_status_note,
            background: background,
            style_pref: style_pref,
            size_type: size_type,
            pant_waist: pant_waist,
            pant_size: pant_size,
            top_size: top_size,
            outfit_combo: outfit_combo,
            bottom_color: bottom_color,
            top_colors: top_colors,
            bra_info: bra_info,
            underwear:underwear,
            shoe_size: shoe_size,
            socks: socks,
            hygiene_kit: hygiene_kit,
            hygiene_items: hygiene_items,
            feminine_hygiene: feminine_hygiene,
            school_supplies: school_supplies,
            status: status,
            status_note: status_note,
            volunteer: volunteer,
            volunteer_user: volunteer_user,
            referrer: referrer,
           },
          { where: { id: referrals.id } }
        );
        res.json("SUCCESS");
  });

module.exports = router; 