const productData = {
    threadAssure: {
        title: "ThreadAssure – Robotic Thread Inspection Cell",
        shortDescription: "Vision-driven inspection cell that checks thread presence, damage, and forming defects.",
        description: "ThreadAssure is a vision-driven inspection cell that checks thread presence, thread damage, profile defects, contamination, and incomplete forming before parts move ahead in assembly. It is designed for production environments where thread defects create costly failures, warranty risk, and rework.",
        working: [
            "Part is presented to camera(s) with controlled lighting",
            "Vision algorithm inspects thread area (profile/edges/contours)",
            "Pass/Fail decision triggers reject/marking (optional)",
            "Logs images + results for traceability"
        ],
        uses: [
            "Threaded caps, housings, inserts, fastener-related parts",
            "Any assembly where “bad thread” causes leakage, failure, or rework"
        ],
        features: [
            "Reliable defect detection with image evidence",
            "Recipe-based inspection per part model",
            "Reject mechanism interface (air blow/stop gate)",
            "Optional OCR / barcode link for traceability"
        ],
        specs: {
            "Cycle Time": "< 2 seconds",
            "Accuracy": "> 99.8%",
            "Camera Resolution": "5MP / 12MP Global Shutter",
            "Lighting": "Multi-angle LED Dome/Ring",
            "Interface": "24V Digital I/O, Ethernet/IP"
        },
        images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"],
        cta: "Share thread type and defect list for a feasibility study."
    },
    stackerFeeder: {
        title: "Stacker Feeder – Intelligent Feeding & Orientation",
        shortDescription: "Automated feeder presenting parts in consistent orientation for stable cycle time.",
        description: "An automated feeder that presents parts in a consistent orientation and timing, improving downstream robot pick accuracy and stabilizing cycle time. Ideal when manual feeding causes bottlenecks, mis-picks, or random orientation errors.",
        working: [
            "Bulk/stack input → controlled singulation",
            "Orientation guidance (mechanical + optional vision)",
            "Presents part at a fixed pickup location with stable timing",
            "Sends ready/part-present signals to robot/PLC"
        ],
        uses: [
            "Any line that needs reliable part presentation before inspection/assembly",
            "Feeding into cobot cells, inspection stations, marking stations"
        ],
        features: [
            "Stable part presentation",
            "Optional vision confirmation",
            "PLC-ready interface signals",
            "Low operator dependency"
        ],
        specs: {
            "Feed Rate": "Up to 60 parts/min",
            "Hopper Capacity": "500 - 2000 parts (variable)",
            "Max Part Size": "150mm x 150mm",
            "Power Supply": "220V AC / 24V DC",
            "Control": "PLC Integrable"
        },
        images: ["https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80"]
    },
    visionInspection: {
        title: "Vision Inspection System – Full-Surface Check",
        shortDescription: "Multi-camera system checking product from all sides for dimensional and cosmetic defects.",
        description: "A multi-camera inspection system that checks the product from all sides (top/side/angle views) to detect dimensional issues, cosmetic defects, label errors, barcode/OCR mismatches, and surface anomalies—with image proof and traceability logs.",
        working: [
            "Product passes through controlled lighting zone",
            "Cameras capture synchronized views",
            "Vision rules evaluate dimensions / presence / defects / print quality",
            "Pass/Fail output triggers reject + stores images + results"
        ],
        uses: [
            "High-volume lines needing consistent visual QC",
            "Label verification, print checks, presence/absence, surface defects"
        ],
        features: [
            "Multi-view coverage = fewer escapes",
            "OCR/barcode integration possible",
            "Full traceability with image logs",
            "Production-ready stability (continuous running)"
        ],
        specs: {
            "Inspection Speed": "Up to 300 parts/min",
            "Measurement Accuracy": "± 0.05 mm",
            "Cameras": "1 to 8 Synchronized Cameras",
            "Software": "Sparkwise Vision Suite",
            "Data Export": "SQL, CSV, MQTT, API"
        },
        images: ["https://images.unsplash.com/photo-1563770095-39d69aa2c774?w=800&q=80"]
    },
    optiMeasure: {
        title: "OptiMeasure 1020 – Mobile Metrology System",
        shortDescription: "Mobile metrology solution for high-precision dimension verification on the shopfloor.",
        description: "OptiMeasure 1020 is a mobile metrology solution built for high-precision dimension verification on the shopfloor. It combines camera-based measurement + controlled workflows to generate repeatable measurements and structured inspection reports.",
        working: [
            "Position the system at inspection point",
            "Capture images with calibrated setup",
            "Compute measurements (pixel-to-mm calibration + geometry tools)",
            "Generate inspection report + logs for traceability"
        ],
        uses: [
            "Dimensional verification, hole pattern checks, alignment checks",
            "Inspection before assembly or final QC",
            "On-line/off-line measurement workflows"
        ],
        features: [
            "Repeatable measurement workflow",
            "Report-ready output",
            "Calibration-first design",
            "Designed for industrial deployment"
        ],
        specs: {
            "FOV": "100mm x 100mm (Configurable)",
            "Resolution": "5µm / pixel",
            "Repeatability": "GR&R < 10%",
            "Mobility": "Battery powered / Cart mounted",
            "Report Format": "PDF, Excel"
        },
        images: ["https://images.unsplash.com/photo-1581093458791-9f302e6d8659?w=800&q=80"]
    },
    paperInspect: {
        title: "PaperInspect Pro – Online Paper Defect Inspection",
        shortDescription: "Production-grade vision system for continuous paper/film lines to detect surface defects.",
        description: "A production-grade vision inspection system for continuous paper/film lines to detect pinholes, scratches, coating issues, streaks, spots, dirt, wrinkles, and surface defects in real time—helping you cut rework, reduce waste, and stabilize quality.",
        working: [
            "High-speed cameras capture the moving web continuously",
            "Controlled lighting highlights surface/texture defects",
            "Algorithms / deep learning classify and locate defects",
            "System logs defect images + coordinates + time",
            "Outputs pass/fail, alarms, and optional marking/reject actions"
        ],
        uses: [
            "Paper, coated paper, thermal paper, laminate films, flexible packaging webs",
            "Quality inspection before rewinding, slitting, or converting"
        ],
        features: [
            "Real-time defect detection with image evidence",
            "Defect map + roll-wise reports",
            "Recipe-based settings per paper grade",
            "Alarm thresholds for early correction"
        ],
        specs: {
            "Line Speed": "Up to 600 m/min",
            "Web Width": "Up to 3000 mm",
            "Min Defect Size": "0.1 mm²",
            "Camera Type": "Line Scan 4k/8k",
            "Output": "Real-time Defect Map"
        },
        integrations: ["PLC", "stack light", "marking printer/inkjet", "MES/SQL reporting"],
        cta: "Share paper width, line speed, defect list, and sample images.",
        images: ["https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&q=80"]
    },
    traceFlow: {
        title: "TraceFlow T&T – End-to-End Track & Trace",
        shortDescription: "Complete track-and-trace solution capturing and validating codes at every stage.",
        description: "A complete track-and-trace solution that captures, validates, and records codes at every stage—ensuring compliance, zero-mismatch packing, faster recalls, and full audit readiness.",
        working: [
            "Capture code (barcode/QR/OCR) at critical checkpoints",
            "Validate against rules + master database",
            "Store event logs: who/when/where + image proof (optional)",
            "Generate batch/lot reports + exception dashboards",
            "Communicate to ERP/MES/3rd party systems"
        ],
        uses: [
            "Packaging lines, label verification, aggregation, serialization workflows",
            "Any line needing “proof of identity” and traceability"
        ],
        features: [
            "Validation rules engine (format, duplication, mapping, status)",
            "Role-based access + audit trail",
            "Rework handling + exception management",
            "Reports: stage-wise, batch-wise, shift-wise"
        ],
        specs: {
            "Code Types": "1D, 2D (DataMatrix, QR), OCR",
            "Read Rate": "> 99.9%",
            "Database": "SQL Server / PostgreSQL",
            "Standards": "GS1, 21 CFR Part 11 ready",
            "Scalability": "Multi-line / Multi-plant"
        },
        integrations: ["SQL Server/REST APIs/CSV", "ERP/MES", "PLC triggers", "printers/scanners"],
        cta: "Tell me your stages + code types + current pain points.",
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"]
    },
    fiberVision: {
        title: "FiberVision Scan – Fiber & Filament Inspection",
        shortDescription: "High-precision inspection for fiber/filament/yarn processes to detect texture and diameter issues.",
        description: "High-precision inspection for fiber/filament/yarn processes to detect hairiness, broken fibers, contamination, uneven texture, diameter variation, and surface anomalies—with consistent monitoring and actionable insights.",
        working: [
            "Cameras + optics capture fiber surface/edge continuously",
            "Lighting setup emphasizes texture and thickness variation",
            "System calculates defect events and trends",
            "Alerts when defect rate crosses thresholds"
        ],
        uses: [
            "Textile fiber lines, technical filament manufacturing, winding/rewinding stages",
            "Online monitoring for consistent quality"
        ],
        features: [
            "Trend analytics (defect rate per time/roll)",
            "Early alarms to prevent roll-wide wastage",
            "Configurable defect classes"
        ],
        specs: {
            "Min Diameter": "10 µm",
            "Speed": "Up to 1000 m/min",
            "Defects Detected": "Broken filaments, Slubs, Diameter var.",
            "Resolution": "High-Mag Optics",
            "Data Log": "Roll-wise quality report"
        },
        cta: "Share fiber type, diameter range, process speed, and defect examples.",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"]
    },
    omniEye: {
        title: "OmniEye Inspect – General Vision QC",
        shortDescription: "Flexible vision platform to verify presence/absence, dimensions, and cosmetic quality.",
        description: "A flexible vision inspection platform to verify presence/absence, orientation, dimensional checks, color/print quality, surface defects, assembly correctness—built for repeatable factory conditions.",
        working: [
            "Part enters inspection zone with stable lighting",
            "Camera(s) capture images at trigger",
            "Vision rules check features and tolerances",
            "Pass/Fail output triggers reject/stop/marking",
            "Images + results stored for traceability"
        ],
        uses: [
            "Assembly verification, labeling verification, component checks",
            "100% inspection on conveyors and fixtures"
        ],
        features: [
            "Recipe per part model",
            "Fast changeover + teach tools",
            "False reject reduction approach",
            "Traceability-ready image log"
        ],
        specs: {
            "Processing Time": "< 50ms typical",
            "Tools": "Pattern Match, Blob, Edge, Color, OCR",
            "I/O": "8 Digital Inputs / 8 Outputs",
            "Lighting Control": "Integrated Strobe Controller",
            "IP Rating": "IP65 / IP67 available"
        },
        cta: "Send 10 good + 10 bad images and your acceptance rules.",
        images: ["https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80"]
    },
    metalCheck: {
        title: "MetalCheck Vision – Metal Surface Inspection",
        shortDescription: "Designed for reflective parts to detect scratches, dents, and machining errors.",
        description: "Designed for challenging reflective parts to detect scratches, dents, burrs, chamfer issues, incorrect machining, engraving/marking errors, and to verify geometry features with controlled reflection management.",
        working: [
            "Specialized lighting (dome/diffuse/dark-field/polarized) controls glare",
            "Multi-angle views capture edges and surface",
            "Algorithms detect micro-surface deviations + edge defects",
            "Results logged with part ID (barcode/OCR optional)"
        ],
        uses: [
            "Machined components, stamped parts, fasteners, housings",
            "Pre-assembly quality gates"
        ],
        features: [
            "Reflection-safe lighting strategies",
            "Multi-view inspection capability",
            "Robust repeatability for 24/7 running"
        ],
        specs: {
            "Min Defect Size": "50 µm",
            "Lighting": "Structured / Polarized / Dome",
            "Algorithm": "AI Surface Anomaly Detection",
            "Throughput": "Subject to part handling",
            "Environment": "Oil/Dust resistant enclosure"
        },
        cta: "Share part finish type, defect types, and FOV needed.",
        images: ["https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=800&q=80"]
    },
    codeSure: {
        title: "CodeSure Verify – Barcode/QR Capture & Validation",
        shortDescription: "Fast system ensuring zero wrong-label dispatch and comprehensive audit logs.",
        description: "A fast barcode/QR system that ensures zero wrong-label dispatch, prevents duplicates, validates master data, and generates traceable reports for audits and internal control.",
        working: [
            "Scanner/camera reads code at station",
            "System validates format + expected mapping",
            "Triggers OK/NG output to PLC",
            "Stores logs + timestamps + operator (optional)"
        ],
        uses: [
            "Packing verification, inbound/outbound checks",
            "Work-in-process validation between stages"
        ],
        features: [
            "Duplicate detection + block",
            "Multi-code mapping (parent-child)",
            "Offline mode with sync (optional)"
        ],
        specs: {
            "Code Support": "All signals 1D/2D symbologies",
            "Speed": "Up to 10 reads/sec",
            "Validation Logic": "Regex, Database Lookup, Format",
            "Connectivity": "Ethernet, Serial, USB",
            "Feedback": "Audio/Visual + Stacklight"
        },
        integrations: ["Handheld scanners", "fixed scanners", "cameras", "SQL/ERP APIs"],
        cta: "Tell me code type, scan distance, speed, and validation rules.",
        images: ["https://images.unsplash.com/photo-1591122947156-32207d522c2a?w=800&q=80"]
    },
    weighGuard: {
        title: "WeighGuard Inline – Weighing & Tolerance Check",
        shortDescription: "Inline system validating weight against tolerance to reduce giveaway and prevent errors.",
        description: "An inline or station-based weighing solution that automatically validates weight against tolerance, triggers rejects, and provides batch/shift reports—reducing giveaway and preventing underweight dispatch.",
        working: [
            "Scale captures weight on trigger",
            "System checks tolerance bands",
            "PLC output controls reject/stop",
            "Logs weight, time, product, operator"
        ],
        uses: [
            "Packing lines, batch verification, QC stations",
            "Weight compliance checks for dispatch control"
        ],
        features: [
            "Configurable tolerance rules",
            "Auto tare / drift monitoring options",
            "Trend graphs + alerts"
        ],
        specs: {
            "Capacity": "From 100g to 100kg scales",
            "Accuracy": "Depends on load cell (e.g. 0.1g)",
            "Speed": "Static or Dynamic options",
            "Interface": "Touchscreen HMI",
            "Data": "Weight Log CSV/SQL"
        },
        integrations: ["Weighing indicators", "PLC", "printers", "SQL/ERP"],
        cta: "Share weight range, accuracy, throughput, and environment.",
        images: ["https://images.unsplash.com/photo-1574689049743-1cf240d9d443?w=800&q=80"]
    },
    smartSCADA: {
        title: "SmartSCADA Custom – Monitoring & Dashboards",
        shortDescription: "Customized SCADA built around production needs for real-time monitoring and OEE.",
        description: "A customized SCADA application built around your actual production needs—monitoring machines, generating alarms, trends, OEE insights, and real-time dashboards that supervisors actually use.",
        working: [
            "Collect tags from PLCs/Devices",
            "Display live status, alarms, trends",
            "Store history in database",
            "Generate shift/day/month reports",
            "Optional remote viewing and role-based access"
        ],
        uses: [
            "Multi-machine monitoring, utility monitoring, line dashboards",
            "Production + maintenance visibility"
        ],
        features: [
            "Custom screens per department",
            "Alarm analytics + downtime reason entry",
            "Expandable architecture"
        ],
        specs: {
            "Tags": "Unlimited",
            "Clients": "Web / Mobile / Desktop",
            "Database": "TimescaleDB / SQL Server",
            "Protocols": "OPC UA, MQTT, Modbus",
            "Alerts": "Email / SMS / Telegram"
        },
        integrations: ["OPC UA/Modbus TCP/Profinet", "SQL/MES/ERP"],
        cta: "Share your tag list + machines + reporting expectations.",
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"]
    },
    winFactory: {
        title: "WinFactory Apps – Industrial Windows Applications",
        shortDescription: "High-reliability Windows apps for factory use: HMIs, dashboards, and reporting.",
        description: "High-reliability Windows apps for factory use: HMI tools, inspection dashboards, device control panels, report generators, traceability apps, and operator-friendly interfaces—built for long-run stability.",
        working: [
            "Operator screens + recipe management",
            "Vision dashboards + ROI tools",
            "Data logging + reports",
            "Device communication bridges",
            "Admin tools (user roles, audit logs)"
        ],
        uses: [],
        features: [
            "Production-stability approach (resource management, reconnect logic)",
            "SQL-based storage + export (Excel/PDF/CSV)",
            "Clean UI optimized for operators"
        ],
        specs: {
            "OS": "Windows 10/11 IoT / LTSC",
            "Framework": ".NET 6+ / WPF / Node",
            "Deployment": "Standalone or Networked",
            "Hardware": "IPC / Panel PC",
            "Support": "Remote Access ready"
        },
        cta: "Tell me your workflow and devices.",
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"]
    },
    plcControl: {
        title: "PLC Control Suite – Logic & Integration",
        shortDescription: "PLC-based automation focusing on interlocks, sequence control, and safety.",
        description: "PLC-based automation for machines and lines including interlocks, sequence control, safety integration, sensors/actuators, and reliable commissioning—focused on uptime and maintainability.",
        working: [
            "Define I/O and sequence logic",
            "Build PLC program + HMI screens",
            "Integrate sensors, drives, valves, conveyors",
            "Test + commission with fault handling and diagnostics"
        ],
        uses: [],
        features: [
            "Structured logic + easy maintenance",
            "Alarm strategy + troubleshooting screens",
            "Expandable architecture for future stations"
        ],
        specs: {
            "Platforms": "Siemens, Allen-Bradley, Mitsubishi, Delta",
            "Languages": "Ladder, SCL, ST (IEC 61131-3)",
            "Safety": "Safety PLC / Relays integrated",
            "Network": "Profinet, EtherCAT, EtherNet/IP",
            "HMI": "Integrated screens"
        },
        cta: "Share your I/O list + sequence description + target cycle time.",
        images: ["https://images.unsplash.com/photo-1580982327559-c1202864eb05?w=800&q=80"]
    },
    deviceIntegration: {
        title: "ConnectHub Integration – 3rd Party Devices",
        shortDescription: "Reliable integration of sensors, printers, and scanners into your ecosystem.",
        description: "Reliable integration of 3rd-party devices into your PLC/SCADA/software ecosystem—so everything talks cleanly and your line doesn’t stop because one device acted “unpredictably.”",
        working: [],
        uses: [
            "Sensors: photoelectric, laser, encoders, vision sensors",
            "Printers: label/thermal/inkjet/marking systems",
            "Scanners: handheld & fixed barcode",
            "Weighing indicators, analyzers, counters",
            "Cameras & lighting controllers"
        ],
        features: [
            "Standardized communication + retry handling",
            "Error codes mapped to operator-friendly alarms",
            "Logging of device-level issues for support"
        ],
        specs: {
            "Interfaces": "Serial (RS232/485), TCP/IP, USB",
            "Protocols": "ASCII, Modbus, Custom Hex",
            "Driver": "Custom Drivers / Libraries",
            "Reliability": "Auto-reconnect logic",
            "Latency": "Optimized for low latency"
        },
        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"]
    },
    commsSetup: {
        title: "Industrial Comms Setup",
        shortDescription: "Complete setup for Modbus / OPC UA / Ethernet / Serial integration.",
        description: "A complete industrial communication setup that connects PLCs, cameras, sensors, printers, and software reliably with correct addressing, timing, buffering, and fail-safe handling.",
        working: [],
        uses: [],
        features: [
            "Protocol selection and mapping",
            "Register/tag map documentation",
            "Network segmentation & IP plan",
            "Buffering, timeouts, reconnect logic",
            "End-to-end data validation"
        ],
        specs: {
            "Physical Layer": "Copper / Fiber / Wireless",
            "Protocols": "Modbus, OPC UA, MQTT, Ethernet/IP",
            "Hardware": "Gateways, Switches, Converters",
            "Security": "VLANs, VPNs, Firewalls",
            "Docs": "Network Topology + Tag Maps"
        },
        integrations: ["Modbus TCP/RTU", "OPC UA", "Profinet/EtherNet/IP", "Serial devices"],
        images: ["https://images.unsplash.com/photo-1544197150-b99a580bbcbf?w=800&q=80"]
    },
    spmBuilder: {
        title: "SPM Builder – Special Purpose Machines",
        shortDescription: "Custom-built SPMs for inspection, assembly, and handling.",
        description: "Custom-built SPMs for inspection, assembly, pressing, dispensing, marking, sorting, and packaging—engineered for stable cycle time, easy maintenance, and long-run reliability.",
        working: [
            "Requirement capture + concept design",
            "Mechanical + electrical design",
            "PLC + HMI + vision integration (if needed)",
            "FAT/SAT testing and deployment"
        ],
        uses: [],
        features: [
            "Cycle-time focused design",
            "Robust error handling + poka-yoke",
            "Data logging + traceability optional",
            "Service-friendly architecture"
        ],
        specs: {
            "Build": "Aluminium Extrusion / Mild Steel structure",
            "Safety": "Light curtains / Door interlocks",
            "Pneumatics": "Festo / SMC / Janatics",
            "Control": "PLC + HMI",
            "Warranty": "1 year standard"
        },
        images: ["https://images.unsplash.com/photo-1581093458791-9f302e6d8659?w=800&q=80"]
    },
    turnkeyAutomation: {
        title: "Turnkey Automation – End-to-End",
        shortDescription: "Complete automation delivery: Design → Build → Integrate → Commission.",
        description: "Complete automation delivery covering mechanical, electrical, controls, vision, software, and data—so you get a system that runs reliably and scales with future requirements.",
        working: [],
        uses: [],
        features: [
            "Process study + solution architecture",
            "Hardware supply + integration",
            "Software + reporting",
            "Training + documentation",
            "Support and upgrades path"
        ],
        specs: {
            "Scope": "Concept to Commissioning",
            "Compliance": "Machine Safety Standards",
            "Documentation": "Electrical dwg, Operator Manuals",
            "Spare parts": "Consumables list provided",
            "Training": "Operator & Maintenance training"
        },
        images: ["https://images.unsplash.com/photo-1565514020176-db99071c356d?w=800&q=80"]
    }
};
