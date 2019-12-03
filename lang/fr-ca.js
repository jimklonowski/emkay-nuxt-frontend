/* eslint-disable quotes */
export default {
  actions: {
    edit_custom_labels: "Editer les étiquettes personnalisées",
    report_expenses: "Signaler des dépenses",
    schedule_ac: "Planifier A/C",
    terminate_vehicle: "Terminer le véhicule",
    used_vehicle_quote: "Devis de véhicule d'occasion"
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
    cancel: "Annuler",
    dark_mode: "Mode Sombre",
    download: "Télécharger",
    fleet: "La flotte",
    language: "La langue",
    ok: "OK",
    save: "Sauver",
    search: "Chercher",
    no_search_results: "Votre recherche pour \"{query}\" n'a trouvé aucun résultat.",
    welcome_to_emkay: "Bienvenue à EMKAY"
  },
  date: {
    bill_date: "Date de facturation",
    end_date: "Date de fin",
    service_date: "Date de service",
    service_time: "Temps de service",
    start_date: "Date de début"
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
        amount: "Montant",
        bill_date: "@:date.bill_date",
        bill_sort: "Tri de la facturation",
        card_number: "Numéro de carte",
        center_code: "Code du centre",
        center_name: "Nom du centre",
        client_use_1: "Utilisation du client 1",
        client_use_2: "Utilisation du client 2",
        client_use_3: "Utilisation du client 3",
        client_use_4: "Utilisation du client 4",
        client_use_5: "Utilisation du client 5",
        client_vehicle_number: "Numéro de véhicule du client",
        driver_id: "Identifiant du pilote",
        driver_name: "Nom du pilote",
        emkay_invoice_date: "Date de facturation EMKAY",
        emkay_invoice_number: "Numéro de facture EMKAY",
        engine_fuel_type: "Type de carburant du moteur",
        exception: "Exception",
        fuel_card_vendor: "Vendeur de cartes de carburant",
        fuel_company_name: "Nom de la compagnie de carburant",
        fuel_company_number: "Numéro de la compagnie de carburant",
        invoice_number: "Numéro de facture",
        level_01: "Niveau 1",
        level_02: "Niveau 2",
        level_03: "Niveau 3",
        merchant_address: "Adresse du marchand",
        merchant_city: "Ville marchande",
        merchant_state: "État marchand",
        merchant_zip: "Code postal marchand",
        model_year: "Année modèle",
        odometer: "Odomètre",
        premium: "Prime",
        product: "Produit",
        product_type: "Type de produit",
        quantity: "Quantité",
        service_date: "@:date.service_date",
        service_time: "@:date.service_time",
        tank_capacity: "Capacité du réservoir",
        tax_exempt: "Exonéré d'impôt",
        to_vehicle_dashboard: "Au tableau de bord du véhicule",
        unit_price: "Prix unitaire",
        vehicle_make: "Marque du véhicule",
        vehicle_model: "Modèle de véhicule",
        vehicle_number: "Numéro de véhicule",
        vin: "Numéro VIN",
        voucher: "Bon"
      },
      // maintenance detail report
      maintenance_detail: {
        report: "Détails de maintenance"
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
    footer: {
      about: "À propos",
      about_emkay: "À propos d'EMKAY",
      blog: "Blog",
      careers: "Carrières",
      contact: "Contact",
      more: "Plus",
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
    home: "Accueil",
    vehicle_dashboard: "Tableau du véhicule"
  },
  vehicle_dashboard: {
    search_placeholder: "Rechercher un véhicule, un conducteur ou un site..."
  }
}
