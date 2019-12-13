/* eslint-disable quotes */
// prettier-ignore
export default {
  actions: {
    edit_custom_labels: "Editer les étiquettes personnalisées",
    report_expenses: "Signaler des dépenses",
    schedule_ac: "Planifier A/C",
    terminate_vehicle: "Terminer le véhicule",
    used_vehicle_quote: "Devis de véhicule d'occasion"
  },
  address: {
    address: "Adresse",
    city: "Ville",
    cell: "Téléphone portable",
    email: "Email",
    phone: "Téléphone",
    state_province: "Province",
    postal_code: "Code Postal"
  },
  auth: {
    account: "Compte",
    email: "Email",
    forgot_password: "Mot de passe oublié",
    login: "Connexion",
    logout: "Déconnexion",
    password: "Mot de passe",
    remember_me: "Souviens-toi de moi",
    username: "Nom d'utilisateur"
  },
  common: {
    amount: "Montant",
    billing_sort: "Tri de facturation",
    cancel: "Annuler",
    center: "Centre",
    center_code: "Code du centre",
    center_name: "Nom du centre",
    client_use_1: "Utilisation client 1",
    client_use_2: "Utilisation client 2",
    client_use_3: "Utilisation client 3",
    client_use_4: "Utilisation client 4",
    client_use_5: "Utilisation client 5",
    client_vehicle_number: "Numéro de véhicule client",
    dark_mode: "Mode Sombre",
    description: "La description",
    download: "Télécharger",
    driver_id: "ID du pilote",
    driver_name: "Nom du pilote",
    edit: "Modifier",
    emkay: "EMKAY",
    emkay_inc: "EMKAY, Inc.",
    fleet: "La flotte",
    invoice_number: "Numéro de facture",
    language: "La langue",
    level: "Niveau",
    loading: "Chargement...",
    merchant: "Marchand",
    no_search_results: "Votre recherche pour \"{query}\" n'a trouvé aucun résultat.",
    odometer: "Odomètre",
    ok: "OK",
    only_one_request: "Une seule demande autorisée à la fois.",
    quantity: "Quantité",
    request_cancelled: "Demande annulée",
    save: "Sauver",
    search: "Chercher",
    to_vehicle_dashboard: "Au tableau de bord du véhicule",
    voucher: "Bon",
    welcome_to_emkay: "Bienvenue à EMKAY"
  },
  date: {
    bill_date: "Date de facturation",
    end_date: "Date de fin",
    invoice_date: "Date de facturation",
    past_days: "0 derniers jours | Dernier Jour | {n} derniers jours",
    service_date: "Date de service",
    service_time: "Temps de service",
    start_date: "Date de début"
  },
  driver: {
    driver_id: "ID du pilote",
    driver_name: "Nom du pilote",
    driver_number: "Numéro de pilote",
    'driver_#': "Pilote #",
    employee_id: "ID d'employé",
    selector_level: "Niveau de sélection"
  },
  footer: {
    about: "À propos",
    about_emkay: "À propos d'EMKAY",
    blog: "Blog",
    careers: "Carrières",
    contact: "Contact",
    more: "@:navigation.more",
    automotive_links: "Liens automobiles",
    fleet_incentives: "Incentives de la flotte",
    leadtime_guides: "Guides de délais",
    press_releases: "Communiqués de presse",
    technology: "La technologie",
    tech: "Tech",
    celsius: "Celsius",
    driver_360: "Driver 360",
    fleet_360: "Fleet 360",
    fleet_exchange: "Échange de flotte",
    geotab: "Geotab"
  },
  management: {
    menu_title: "Gestion",
    menu_subtitle: "Configurer les paramètres de votre flotte",
    fleet: {
      category: "Flotte",
      customize_your_fleet_labels: "Personnaliser les étiquettes de votre flotte",
      manage_your_cases: "Gérer vos cas",
      manage_your_drivers: "Gérer vos chauffeurs",
      manage_your_driver_fuel_pins: "Gérez les codes PIN carburant de votre conducteur",
      manage_your_enotifications: "Gérez vos eNotifications",
      manage_your_fleet_policies: "Gérez les politiques de votre flotte",
      manage_your_online_users: "Gérez vos utilisateurs en ligne",
      view_your_fuel_auth_profiles: "Affichez vos profils d'authentification de carburant"
    },
    customization: {
      category: "Personnalisation",
      approve_your_driver_orders: "Approuver vos commandes de chauffeur",
      approve_your_maintenance_repairs: "Approuver vos réparations d'entretien",
      request_an_mvr: "Demander un MVR",
      upload_your_odometers: "Téléchargez vos odomètres"
    },
    tools: {
      category: "Outils",
      locate_preferred_shops: "Localiser les magasins préférés",
      quote_a_transport: "Estimer un transport",
      lcca: "LCCA"
    }
  },
  ordering: {
    menu_title: "Commande",
    menu_subtitle: "Passer des commandes, vérifier le statut des commandes, etc.",
    orders: {
      category: "Commandes",
      place_factory_orders: {
        title: "Commandes d'usine"
      },
      place_stock_orders: {
        title: "Passer des commandes"
      },
      view_order_requests: {
        title: "Afficher les demandes de commande"
      }
    },
    driver_orders: {
      category: "Commandes de chauffeur",
      allow_drivers_to_order: {
        title: "Autoriser les conducteurs à commander"
      },
      approve_driver_orders: {
        title: "Approuver les commandes de pilotes"
      },
      manage_driver_order_settings: {
        title: "Gérer les paramètres de commande de pilotes"
      }
    },
    selectors: {
      category: "Sélecteurs",
      manage_selectors: {
        title: "Gérer les sélecteurs"
      },
      manage_selector_groups: {
        title: "Gérer les groupes de sélecteurs"
      }
    }
  },
  reports: {
    menu_title: "Rapport",
    menu_subtitle: "Tous vos rapports de flotte au même endroit",

    // Fleet Report Bucket
    fleet: {
      // bucket name
      category: "@:common.fleet",
      // inventory report
      inventory: {
        report: "Rapport d'inventaire"
      },
      // order status report
      order_status: {
        report: "Statut de la commande"
      },
      // replacement analysis report
      replacement_analysis: {
        report: "Analyse de remplacement"
      },
      // sold vehicle analysis report
      sold_vehicle_analysis: {
        report: "Analyse du véhicule vendu"
      }
    },

    // Expenses Report Bucket
    expenses: {
      // bucket name
      category: "Les dépenses",
      // expense summary report
      expense_summary: {
        report: "Résumé des dépenses"
      },
      // fuel detail report
      fuel_detail: {
        report: "Détails du carburant",
        amount: "@:common.amount",
        bill_date: "@:date.bill_date",
        bill_sort: "@:common.billing_sort",
        card_number: "Numéro de carte",
        center_code: "@:common.center_code",
        center_name: "@:common.center_name",
        client_use_1: "@:common.client_use_1",
        client_use_2: "@:common.client_use_2",
        client_use_3: "@:common.client_use_3",
        client_use_4: "@:common.client_use_4",
        client_use_5: "@:common.client_use_5",
        client_vehicle_number: "@:common.client_vehicle_number",
        driver_id: "@:common.driver_id",
        driver_name: "@:common.driver_name",
        emkay_invoice_date: "@:date.invoice_date EMKAY",
        emkay_invoice_number: "@:common.invoice_number EMKAY",
        engine_fuel_type: "Type de carburant du moteur",
        exception: "Exception",
        fuel_card_vendor: "Vendeur de cartes de carburant",
        fuel_company_name: "Nom de la compagnie de carburant",
        fuel_company_number: "Numéro de la compagnie de carburant",
        invoice_number: "@:common.invoice_number",
        level_01: "@:common.level 01",
        level_02: "@:common.level 02",
        level_03: "@:common.level 03",
        merchant_address: "@:common.merchant @:address.address",
        merchant_city: "@:common.merchant @:address.city",
        merchant_state: "@:common.merchant @:address.state_province",
        merchant_zip: "@:common.merchant @:address.postal_code",
        model_year: "@:vehicle.model_year",
        odometer: "@:common.odometer",
        premium: "Prime",
        product: "Produit",
        product_type: "Type de produit",
        quantity: "@:common.quantity",
        service_date: "@:date.service_date",
        service_time: "@:date.service_time",
        tank_capacity: "Capacité du réservoir",
        tax_exempt: "Exonéré d'impôt",
        unit_price: "Prix unitaire",
        vehicle_make: "@:vehicle.make",
        vehicle_model: "@:vehicle.model",
        vehicle_number: "@:vehicle.vehicle_number",
        vin: "@:vehicle.vin",
        voucher: "@:common.voucher"
      },
      // maintenance detail report
      maintenance_detail: {
        report: "Détails de Entretien",
        active: "Active",
        amount: "@:common.amount",
        ata_group: "Groupe ATA",
        ata_group_description: "Description du groupe ATA",
        bill_sort: "@:common.billing_sort",
        brake_manufacturer: "Fabricant de freins",
        brake_thickness: "Épaisseur de frein",
        center_code: "@:common.center_code",
        center_name: "@:common.center_name",
        charge_code: "Code de charge",
        client_use_1: "@:common.client_use_1",
        client_use_2: "@:common.client_use_2",
        client_use_3: "@:common.client_use_3",
        client_use_4: "@:common.client_use_4",
        client_use_5: "@:common.client_use_5",
        client_vehicle_number: "@:common.client_vehicle_number",
        customer_po: "PO client",
        description: "@:common.description",
        // driver_first_name: "Driver First Name",
        // driver_last_name: "Driver Last Name",
        driver_name: "@:common.driver_name",
        engine_hours: "Heures moteur",
        expense_category: "Catégorie de dépenses",
        front_left_brake: "Frein avant gauche",
        front_left_drum: "Tambour avant gauche",
        front_left_rotor: "Rotor avant gauche",
        front_left_tire: "Pneu avant gauche",
        front_right_brake: "Frein avant droit",
        front_right_drum: "Tambour avant droit",
        front_right_rotor: "Rotor avant droit",
        front_right_tire: "Pneu avant droit",
        gl_code: "Code GL",
        invoice_number: "@:common.invoice_number",
        labor_or_part: "Travail ou pièce",
        level_01: "@:common.level 01",
        level_02: "@:common.level 02",
        level_03: "@:common.level 03",
        maintenance_category: "Catégorie de maintenance",
        maintenance_code: "Code de maintenance",
        model_year: "@:vehicle.model_year",
        odometer: "@:common.odometer",
        quantity: "@:common.quantity",
        rear_left_brake: "Frein arrière gauche",
        rear_left_drum: "Tambour arrière gauche",
        rear_left_rotor: "Rotor arrière gauche",
        rear_left_tire: "Pneu arrière gauche",
        rear_right_brake: "Frein arrière droit",
        rear_right_drum: "Tambour arrière droit",
        rear_right_rotor: "Rotor arrière droit",
        rear_right_tire: "Pneu arrière droit",
        service_date: "@:date.service_date",
        tire_manufacturer: "Fabricant de pneus",
        tire_model: "Modèle de pneu",
        tire_size: "La taille des pneus",
        vehicle_make: "@:vehicle.make",
        vehicle_model: "@:vehicle.model",
        vehicle_number: "@:vehicle.vehicle_number",
        vendor_factor: "Facteur fournisseur",
        vendor_name: "Nom du vendeur",
        vendor_number: "Numéro de vendeur",
        voucher: "@:common.voucher"
      },
      // short term rental detail report
      short_term_rental_detail: {
        report: "Détails de voiture de location"
      },
      // toll detail report
      toll_detail: {
        report: "Détails du péage"
      }
    },

    // Invoicing Report Bucket
    invoicing: {
      // bucket name
      category: "Facturation",
      // custom invoicing
      custom_invoicing: {
        report: "Facturation personnalisée"
      },
      // invoice history report
      invoice_history: {
        report: "Histoire de la facture"
      }
    },

    // Services Report Bucket
    services: {
      // bucket name
      category: "Les services",
      // accident claim
      accident_claim: {
        report: "Réclamation d'accident"
      },
      // driver360 mileage report
      driver_360_mileage: {
        report: "Driver 360 Kilométrage"
      },
      // evoucher report
      evoucher: {
        report: "eVoucher"
      },
      // license renewal report
      license_renewal: {
        report: "Renouvellement de licence"
      }
    },

    // Safety and Telematics Report Bucket
    safety_and_telematics: {
      // bucket name
      category: "Sécurité et télématique",
      // driver record report
      driver_record: {
        report: "Dossiers de conducteur"
      },
      // driver safety report
      driver_safety: {
        report: "Sécurité du conducteur"
      },
      // engine faults report
      engine_faults: {
        report: "Défauts moteur"
      },
      // saferoads fleet summary report
      saferoads_fleet_summary: {
        report: "Résumé de la flotte de Saferoads"
      },
      // saferoads trip detail report
      saferoads_trip_detail: {
        report: "Détails du voyage Saferoads"
      }
    },

    // Custom Reports Bucket
    custom: {
      // bucket name
      category: "Douane",
      // Custom Fuel Report
      fuel: {
        report: "Carburant"
      },
      // Custom Insurance Claim Report
      insurance_claim: {
        report: "Réclamation d'assurance"
      },
      // Custom Invoice Report
      invoice: {
        report: "Facture d'achat"
      },
      // Custom Maintenance Report
      maintenance: {
        report: "Entretien"
      },
      // Custom vehicle/driver report
      vehicle_and_driver: {
        report: "Véhicule et conducteur"
      },
      // Custom Violation Report
      violation: {
        report: "Les violations"
      }
    }
  },
  navigation: {
    account_management: "Gestion de compte",
    back: "Retourner",
    home: "Accueil",
    more: "Plus",
    ordering: "Commande",
    reporting: "Rapport",
    see_more: "Voir Plus",
    vehicle_dashboard: "@:vehicle.dashboard"
  },
  vehicle: {
    client_vehicle_number: "Numéro de véhicule client",
    dashboard: "Tableau du véhicule",
    fuel: "Carburant",
    maintenance: "Entretien",
    make: "Marque du véhicule",
    model: "Modèle de véhicule",
    model_year: "Année modèle",
    vehicle_classification: "Classification du véhicule",
    vehicle_number: "Numéro de véhicule",
    'vehicle_#': "Véhicule #",
    vin: "Numéro VIN"
  },
  vehicle_dashboard: {
    search_placeholder: "Rechercher un véhicule, un conducteur ou un site..."
  }
}
