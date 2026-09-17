/* GI 321 qgis2web dashboard extension.
   Load this file AFTER resources/qgis2web.js so that `map` and the
   qgis2web layer variables already exist. */

/* =========================================================
   GI 321 RURAL ROAD INVENTORY
   DECISION-SUPPORT DASHBOARD
   ========================================================= */

(function () {

    'use strict';


    /* =====================================================
       BASIC FUNCTIONS
       ===================================================== */

    const normalise = (value) =>
        String(value ?? '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/[^a-z0-9]+/gi, ' ')
            .trim()
            .toLowerCase();


    function flattenLayers(collection) {

        const result = [];

        (collection || []).forEach((layer) => {

            if (
                layer &&
                typeof layer.getLayers === 'function'
            ) {

                result.push(
                    ...flattenLayers(
                        layer.getLayers().getArray()
                    )
                );

            } else if (layer) {

                result.push(layer);

            }

        });

        return result;
    }


    function findLayer(names) {

        const wanted =
            names.map(normalise);

        const candidates =
            flattenLayers(
                window.layersList ||
                map.getLayers().getArray()
            );

        return candidates.find((layer) => {

            const title =
                normalise(
                    layer.get('popuplayertitle') ||
                    layer.get('title') ||
                    ''
                );

            return wanted.some(
                (name) =>
                    title.includes(name)
            );

        }) || null;
    }


    function safeFeatures(layer) {

        if (
            !layer ||
            !layer.getSource ||
            !layer.getSource()
        ) {

            return [];

        }

        const source =
            layer.getSource();

        return typeof source.getFeatures === 'function'
            ? source.getFeatures()
            : [];
    }


    function firstProperty(
        feature,
        names
    ) {

        for (const name of names) {

            const value =
                feature.get(name);

            if (
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ''
            ) {

                return value;

            }

        }

        return null;
    }


    function parseNumber(value) {

        const match =
            String(value ?? '')
                .replace(/,/g, '')
                .match(
                    /-?\d+(?:\.\d+)?/
                );

        return match
            ? Number(match[0])
            : 0;
    }


    function fitFeatures(features) {

        if (!features.length) {
            return;
        }

        const extent =
            ol.extent.createEmpty();

        features.forEach(
            (feature) => {

                const geometry =
                    feature.getGeometry();

                if (geometry) {

                    ol.extent.extend(
                        extent,
                        geometry.getExtent()
                    );

                }

            }
        );


        if (!ol.extent.isEmpty(extent)) {

            map.getView().fit(
                extent,
                {
                    padding: [
                        70,
                        70,
                        70,
                        400
                    ],

                    maxZoom: 17,

                    duration: 600
                }
            );

        }

    }


    /* =====================================================
       FIND PROJECT LAYERS
       ===================================================== */

    const culvertLayer =
        findLayer([
            'culverts',
            'culvert condition'
        ]);


    const outletLayer =
        findLayer([
            'stream outlets',
            'outlets',
            'waterways',
            'river and creek location'
        ]);


    const roadLayer =
        findLayer([
            'road centreline',
            'road centerline',
            'road'
        ]);


    const gradientLayer =
        findLayer([
            'gradient segments',
            'road gradient',
            'gradient'
        ]);


    const riskLayer =
        findLayer([
            'inundation risk',
            'road inundation',
            'risk'
        ]);


    const chainageLayer =
        findLayer([
            'chainage points',
            'chainage'
        ]);


    /* =====================================================
       GET FEATURES
       ===================================================== */

    const culvertFeatures =
        safeFeatures(
            culvertLayer
        );


    const outletFeatures =
        safeFeatures(
            outletLayer
        );


    const roadFeatures =
        safeFeatures(
            roadLayer
        );


    const gradientFeatures =
        safeFeatures(
            gradientLayer
        );


    const riskFeatures =
        safeFeatures(
            riskLayer
        );


    const chainageFeatures =
        safeFeatures(
            chainageLayer
        );


    /* =====================================================
       FIND ATTRIBUTE FIELDS
       ===================================================== */

    const conditionField =
        culvertFeatures.length &&
        [
            'condition',
            'Condition',
            'culvert_condition',
            'Culvert Condition'
        ].find(
            (field) =>
                culvertFeatures[0]
                    .get(field) !== undefined
        ) ||
        'condition';


    /* =====================================================
       PERENNIAL OUTLETS
       ===================================================== */

    const perennialOutlets =
        outletFeatures.filter(
            (feature) =>

                normalise(
                    firstProperty(
                        feature,
                        [
                            'flow_status',
                            'Flow Status',
                            'Flow_Statu'
                        ]
                    )
                ) === 'perennial'
        );


    /* =====================================================
       CULVERT CONDITION COUNTS
       ===================================================== */

    const conditionCounts =
        culvertFeatures.reduce(
            (counts, feature) => {

                const value =
                    String(
                        feature.get(
                            conditionField
                        ) ?? 'Unclassified'
                    ).trim() ||
                    'Unclassified';


                counts[value] =
                    (counts[value] || 0) + 1;


                return counts;

            },
            {}
        );


    /* =====================================================
       PRIORITY CULVERTS
       ===================================================== */

    const priorityCulverts =
        culvertFeatures.filter(
            (feature) => {

                const condition =
                    normalise(
                        feature.get(
                            conditionField
                        )
                    );

                return (

                    condition.includes(
                        'deteriorated'
                    )

                    ||

                    condition.includes(
                        'barely functional'
                    )

                );

            }
        );


    /* =====================================================
       HIGH / VERY HIGH RISK
       ===================================================== */

    const riskField =
        riskFeatures.length &&
        [
            'risk_level',
            'Risk Level',
            'risk',
            'Risk'
        ].find(
            (field) =>
                riskFeatures[0]
                    .get(field) !== undefined
        ) ||
        'risk_level';


    const highRiskFeatures =
        riskFeatures.filter(
            (feature) => {

                const value =
                    normalise(
                        feature.get(
                            riskField
                        )
                    );


                return (

                    value.includes(
                        'high'
                    )

                    ||

                    value.includes(
                        'very high'
                    )

                );

            }
        );


    /* =====================================================
       ROAD LENGTH
       ===================================================== */

    const roadLength =
        roadFeatures.reduce(
            (total, feature) => {

                const value =
                    firstProperty(
                        feature,
                        [
                            'length_m',
                            'Lenght (m)',
                            'length',
                            'Length'
                        ]
                    );


                return (
                    total +
                    parseNumber(value)
                );

            },
            0
        );


    /* =====================================================
       DASHBOARD CSS
       ===================================================== */

    const style =
        document.createElement(
            'style'
        );


    style.textContent = `

        /* ================================================
           MAIN DASHBOARD
           ================================================ */

        #gi321-dashboard {

            position: fixed;

            top: 28px;
            left: 46px;
            bottom: 20px;

            width: 345px;

            z-index: 5000;

            box-sizing: border-box;

            padding: 18px 15px;

            background: #ffffff;

            border: 3px solid #173f6b;

            border-radius: 12px;

            box-shadow:
                0 5px 20px
                rgba(0,0,0,0.18);

            overflow-y: auto;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            color: #222222;
        }


        /* ================================================
           TITLE
           ================================================ */

        #gi321-dashboard-title {

            margin:
                3px 2px 2px;

            padding-right:
                35px;

            color:
                #173f6b;

            font:
                700 19px/1.2
                Arial,
                Helvetica,
                sans-serif;

            letter-spacing:
                0.2px;

            text-transform:
                uppercase;
        }


        /* ================================================
           DATE
           ================================================ */

        #gi321-dashboard-date {

            margin:
                2px 2px 14px;

            color:
                #777777;

            font:
                11px
                Arial,
                Helvetica,
                sans-serif;
        }


        /* ================================================
           CLOSE BUTTON
           ================================================ */

        #gi321-close {

            position:
                absolute;

            top:
                9px;

            right:
                9px;

            width:
                30px;

            height:
                30px;

            border:
                none;

            border-radius:
                5px;

            background:
                #edf2f7;

            color:
                #173f6b;

            font-size:
                21px;

            font-weight:
                bold;

            cursor:
                pointer;
        }


        #gi321-close:hover {

            background:
                #dbe5ef;
        }


        /* ================================================
           METRIC CARDS
           ================================================ */

        #gi321-metrics {

            display:
                grid;

            grid-template-columns:
                1fr 1fr;

            gap:
                7px;

            margin-bottom:
                39px;
        }


        .gi321-card {

            min-height:
                68px;

            padding:
                8px 10px;

            box-sizing:
                border-box;

            border:
                2px solid #9bb7d3;

            border-radius:
                7px;

            background:
                #ffffff;

            text-align:
                left;

            cursor:
                pointer;

            transition:
                all 0.15s ease;
        }


        .gi321-card:hover {

            background:
                #f5f9fc;

            border-color:
                #173f6b;

            transform:
                translateY(-1px);
        }


        .gi321-card-number {

            display:
                block;

            margin-bottom:
                5px;

            color:
                #173f6b;

            font:
                700 21px
                Arial,
                Helvetica,
                sans-serif;
        }


        .gi321-card-label {

            display:
                block;

            color:
                #555555;

            font:
                12px
                Arial,
                Helvetica,
                sans-serif;
        }


        /* ================================================
           SECTION TITLE
           ================================================ */

        .gi321-section-title {

            margin:
                0 2px 9px;

            color:
                #173f6b;

            font:
                700 15px
                Arial,
                Helvetica,
                sans-serif;

            text-transform:
                uppercase;

            letter-spacing:
                0.2px;
        }


        /* ================================================
           CULVERT CONDITION
           ================================================ */

        #gi321-condition {

            margin-bottom:
                17px;
        }


        .gi321-bar-row {

            display:
                grid;

            grid-template-columns:
                105px 1fr 25px;

            align-items:
                center;

            gap:
                7px;

            margin-bottom:
                8px;

            cursor:
                pointer;
        }


        .gi321-bar-label {

            color:
                #222222;

            font:
                11px
                Arial,
                Helvetica,
                sans-serif;

            white-space:
                nowrap;
        }


        .gi321-bar-track {

            height:
                12px;

            background:
                #e5ebf0;

            overflow:
                hidden;

            border-radius:
                0;
        }


        .gi321-bar-fill {

            display:
                block;

            height:
                100%;

            transition:
                width 0.3s ease;
        }


        /* ================================================
           🔴 DETERIORATED = RED
           ================================================ */

        .bar-deteriorated {

            background:
                #e51b23 !important;
        }


        /* ================================================
           🟠 BARELY FUNCTIONAL = ORANGE
           ================================================ */

        .bar-barely {

            background:
                #ffad5c !important;
        }


        /* ================================================
           🟢 FUNCTIONAL = GREEN
           ================================================ */

        .bar-functional {

            background:
                #159447 !important;
        }


        /* ================================================
           ⚪ UNCLASSIFIED = GREY
           ================================================ */

        .bar-unclassified {

            background:
                #777777 !important;
        }


        .gi321-bar-number {

            color:
                #222222;

            font:
                700 11px
                Arial,
                Helvetica,
                sans-serif;

            text-align:
                right;
        }


        /* ================================================
           DATA CHECK BOX
           ================================================ */

        #gi321-data-check {

            margin-top:
                8px;

            padding:
                8px 9px;

            border:
                1px solid #d59b18;

            background:
                #fffaf0;

            color:
                #8a6500;

            font:
                11px/1.4
                Arial,
                Helvetica,
                sans-serif;

            border-radius:
                3px;
        }


        /* ================================================
           SEARCH
           ================================================ */

        #gi321-tools {

            margin-top:
                15px;

            padding-top:
                12px;

            border-top:
                1px solid #d9e1e8;
        }


        #gi321-search,
        #gi321-condition-filter {

            width:
                100%;

            height:
                34px;

            box-sizing:
                border-box;

            border:
                1px solid #aebdcc;

            border-radius:
                4px;

            background:
                #ffffff;

            color:
                #333333;

            font:
                12px
                Arial,
                Helvetica,
                sans-serif;
        }


        #gi321-search {

            padding:
                7px 9px;
        }


        #gi321-condition-filter {

            margin-top:
                7px;

            padding:
                5px;
        }


        /* ================================================
           BUTTONS
           ================================================ */

        .gi321-button-row {

            display:
                flex;

            gap:
                7px;

            margin-top:
                7px;
        }


        .gi321-button {

            flex:
                1;

            height:
                33px;

            border:
                none;

            border-radius:
                4px;

            background:
                #173f6b;

            color:
                #ffffff;

            font:
                700 11px
                Arial,
                Helvetica,
                sans-serif;

            cursor:
                pointer;
        }


        .gi321-button:hover {

            background:
                #0e2d4d;
        }


        .gi321-button.reset {

            background:
                #e6ebef;

            color:
                #333333;
        }


        /* ================================================
           STATUS
           ================================================ */

        #gi321-status {

            margin-top:
                7px;

            color:
                #666666;

            font:
                10px/1.4
                Arial,
                Helvetica,
                sans-serif;
        }


        /* ================================================
           OPEN DASHBOARD BUTTON
           ================================================ */

        #gi321-open {

            position:
                fixed;

            top:
                20px;

            left:
                20px;

            z-index:
                4999;

            display:
                none;

            padding:
                10px 15px;

            border:
                none;

            border-radius:
                6px;

            background:
                #173f6b;

            color:
                #ffffff;

            font:
                700 12px
                Arial,
                Helvetica,
                sans-serif;

            cursor:
                pointer;

            box-shadow:
                0 3px 10px
                rgba(0,0,0,0.2);
        }


        /* ================================================
           MAP TITLE
           ================================================ */

        #gi321-map-label {

            position:
                fixed;

            top:
                170px;

            left:
                62%;

            transform:
                translateX(-50%);

            z-index:
                2000;

            color:
                #173f6b;

            font:
                700 18px
                Arial,
                Helvetica,
                sans-serif;

            pointer-events:
                none;
        }


        /* ================================================
           NORTH ARROW
           ================================================ */

        #gi321-north {

            position:
                fixed;

            top:
                195px;

            right:
                7%;

            z-index:
                3000;

            width:
                40px;

            text-align:
                center;

            pointer-events:
                none;

            color:
                #111111;
        }


        #gi321-north-letter {

            display:
                block;

            font:
                700 14px
                Arial,
                Helvetica,
                sans-serif;
        }


        #gi321-north-arrow {

            display:
                block;

            font:
                700 24px
                Arial,
                Helvetica,
                sans-serif;

            line-height:
                22px;
        }


        /* ================================================
           MOBILE
           ================================================ */

        @media (max-width: 700px) {

            #gi321-dashboard {

                top:
                    10px;

                left:
                    10px;

                right:
                    10px;

                bottom:
                    10px;

                width:
                    auto;
            }


            #gi321-dashboard-title {

                font-size:
                    17px;
            }


            #gi321-map-label {

                display:
                    none;
            }


            #gi321-north {

                top:
                    70px;

                right:
                    15px;
            }

        }


        @media (max-width: 420px) {

            #gi321-dashboard {

                padding:
                    15px 12px;
            }


            .gi321-card {

                min-height:
                    65px;

                padding:
                    7px 8px;
            }


            .gi321-card-number {

                font-size:
                    18px;
            }


            .gi321-card-label {

                font-size:
                    10px;
            }

        }

    `;


    document.head.appendChild(
        style
    );


    /* =====================================================
       CREATE DASHBOARD
       ===================================================== */

    const dashboard =
        document.createElement(
            'div'
        );


    dashboard.id =
        'gi321-dashboard';


    dashboard.innerHTML = `

        <button
            id="gi321-close"
            title="Close dashboard">
            ×
        </button>


        <div
            id="gi321-dashboard-title">

            GI 321 RURAL ROAD INVENTORY
            - STUDENT 24401038

        </div>


        <div
            id="gi321-dashboard-date">

            Correct data package — 26 July 2026

        </div>


        <div
            id="gi321-metrics">
        </div>


        <div
            id="gi321-condition">

            <div
                class="gi321-section-title">

                CULVERT CONDITION

            </div>


            <div
                id="gi321-bars">
            </div>


            <div
                id="gi321-data-check">

                Data check: source value 'c'
                is displayed as Unclassified
                until verified.

            </div>

        </div>


        <div
            id="gi321-tools">

            <div
                class="gi321-section-title">

                MAP SEARCH

            </div>


            <input
                id="gi321-search"
                type="search"
                placeholder="Search layer attributes...">


            <select
                id="gi321-condition-filter">

                <option value="">

                    All culvert conditions

                </option>

            </select>


            <div
                class="gi321-button-row">

                <button
                    id="gi321-search-button"
                    class="gi321-button">

                    SEARCH

                </button>


                <button
                    id="gi321-reset"
                    class="gi321-button reset">

                    RESET

                </button>

            </div>


            <div
                id="gi321-status">

                Dashboard ready.

            </div>

        </div>

    `;


    document.body.appendChild(
        dashboard
    );


    /* =====================================================
       MAP LABEL
       ===================================================== */

    const mapLabel =
        document.createElement(
            'div'
        );


    mapLabel.id =
        'gi321-map-label';


    mapLabel.textContent =
        'Interactive map area';


    document.body.appendChild(
        mapLabel
    );


    /* =====================================================
       NORTH ARROW
       ===================================================== */

    const north =
        document.createElement(
            'div'
        );


    north.id =
        'gi321-north';


    north.innerHTML = `

        <span
            id="gi321-north-letter">
            N
        </span>

        <span
            id="gi321-north-arrow">
            ↑
        </span>

    `;


    document.body.appendChild(
        north
    );


    /* =====================================================
       OPEN BUTTON
       ===================================================== */

    const openButton =
        document.createElement(
            'button'
        );


    openButton.id =
        'gi321-open';


    openButton.textContent =
        '☰ Dashboard';


    openButton.title =
        'Open dashboard';


    document.body.appendChild(
        openButton
    );


    /* =====================================================
       OPEN / CLOSE DASHBOARD
       ===================================================== */

    document
        .querySelector(
            '#gi321-close'
        )
        .addEventListener(
            'click',
            () => {

                dashboard.style.display =
                    'none';

                openButton.style.display =
                    'block';

            }
        );


    openButton
        .addEventListener(
            'click',
            () => {

                dashboard.style.display =
                    'block';

                openButton.style.display =
                    'none';

            }
        );


    /* =====================================================
       METRIC CARDS
       ===================================================== */

    const metrics = [

        {
            label:
                'Total culverts',

            value:
                culvertFeatures.length,

            action:
                'all'
        },


        {
            label:
                'Priority culverts',

            value:
                priorityCulverts.length,

            action:
                'priority'
        },


        {
            label:
                'Stream outlets',

            value:
                outletFeatures.length,

            action:
                'streams'
        },


        {
            label:
                'Perennial outlets',

            value:
                perennialOutlets.length,

            action:
                'perennial-outlets'
        },


        {
            label:
                'High / very-high zones',

            value:
                highRiskFeatures.length,

            action:
                'risk'
        },


        {
            label:
                'Gradient segments',

            value:
                gradientFeatures.length,

            action:
                'gradient'
        },


        {
            label:
                'Road length',

            value:
                roadLength
                    ? (
                        roadLength / 1000
                    ).toFixed(2) + ' km'
                    : 'n/a',

            action:
                'road'
        }

    ];


    const metricContainer =
        document.querySelector(
            '#gi321-metrics'
        );


    metrics.forEach(
        (metric) => {

            const card =
                document.createElement(
                    'button'
                );


            card.type =
                'button';


            card.className =
                'gi321-card';


            card.dataset.action =
                metric.action;


            card.innerHTML = `

                <span
                    class="gi321-card-number">

                    ${metric.value}

                </span>


                <span
                    class="gi321-card-label">

                    ${metric.label}

                </span>

            `;


            metricContainer.appendChild(
                card
            );

        }
    );


    /* =====================================================
       CULVERT CONDITION BARS
       ===================================================== */

    const bars =
        document.querySelector(
            '#gi321-bars'
        );


    const conditionSelect =
        document.querySelector(
            '#gi321-condition-filter'
        );


    const maxCondition =
        Math.max(
            1,
            ...Object.values(
                conditionCounts
            )
        );


    Object.entries(
        conditionCounts
    )
    .sort(
        (a, b) =>
            b[1] - a[1]
    )
    .forEach(
        ([label, count]) => {

            const row =
                document.createElement(
                    'div'
                );


            row.className =
                'gi321-bar-row';


            /* ---------------------------------------------
               SELECT CORRECT COLOR
               --------------------------------------------- */

            const condition =
                normalise(label);


            let barClass =
                'bar-unclassified';


            /* 🔴 RED */

            if (
                condition.includes(
                    'deteriorated'
                )
            ) {

                barClass =
                    'bar-deteriorated';

            }


            /* 🟠 ORANGE */

            else if (
                condition.includes(
                    'barely functional'
                ) ||
                condition.includes(
                    'barely'
                )
            ) {

                barClass =
                    'bar-barely';

            }


            /* 🟢 GREEN */

            else if (
                condition ===
                    'functional' ||
                (
                    condition.includes(
                        'functional'
                    ) &&
                    !condition.includes(
                        'barely'
                    )
                )
            ) {

                barClass =
                    'bar-functional';

            }


            /* ⚪ GREY */

            else {

                barClass =
                    'bar-unclassified';

            }


            const percentage =
                (
                    count /
                    maxCondition
                ) * 100;


            row.innerHTML = `

                <span
                    class="gi321-bar-label">

                    ${label}

                </span>


                <span
                    class="gi321-bar-track">

                    <span
                        class="
                            gi321-bar-fill
                            ${barClass}
                        "
                        style="
                            width:
                            ${percentage}%;
                        ">
                    </span>

                </span>


                <span
                    class="gi321-bar-number">

                    ${count}

                </span>

            `;


            /* Click condition bar */

            row.addEventListener(
                'click',
                () => {

                    conditionSelect.value =
                        label;

                    applyCulvertFilter(
                        label
                    );

                }
            );


            bars.appendChild(
                row
            );


            /* Add condition to dropdown */

            const option =
                document.createElement(
                    'option'
                );


            option.value =
                label;


            option.textContent =
                label;


            conditionSelect.appendChild(
                option
            );

        }
    );


    /* =====================================================
       CULVERT FILTER
       ===================================================== */

    let activeCondition =
        '';


    function applyCulvertFilter(
        condition
    ) {

        activeCondition =
            condition || '';


        const selected =
            activeCondition

                ? culvertFeatures.filter(
                    (feature) =>

                        normalise(
                            feature.get(
                                conditionField
                            )
                        ) ===
                        normalise(
                            activeCondition
                        )
                )

                : culvertFeatures;


        if (selected.length) {

            fitFeatures(
                selected
            );

        }


        document.querySelector(
            '#gi321-status'
        ).textContent =

            activeCondition

                ? `${selected.length} culvert(s) selected.`

                : `Showing all ${selected.length} culverts.`;

    }


    conditionSelect
        .addEventListener(
            'change',
            (event) => {

                applyCulvertFilter(
                    event.target.value
                );

            }
        );


    /* =====================================================
       METRIC CARD ACTIONS
       ===================================================== */

    function dashboardAction(
        action
    ) {

        let features = [];


        if (
            action ===
            'all'
        ) {

            features =
                culvertFeatures;

        }


        else if (
            action ===
            'priority'
        ) {

            features =
                priorityCulverts;

        }


        else if (
            action ===
            'streams'
        ) {

            features =
                outletFeatures;

        }


        else if (
            action ===
            'perennial-outlets'
        ) {

            features =
                perennialOutlets;

        }


        else if (
            action ===
            'risk'
        ) {

            features =
                highRiskFeatures;

        }


        else if (
            action ===
            'gradient'
        ) {

            features =
                gradientFeatures;

        }


        else if (
            action ===
            'road'
        ) {

            features =
                roadFeatures;

        }


        if (
            features.length
        ) {

            fitFeatures(
                features
            );

        }


        document.querySelector(
            '#gi321-status'
        ).textContent =

            `${features.length} feature(s) selected.`;

    }


    metricContainer
        .addEventListener(
            'click',
            (event) => {

                const card =
                    event.target.closest(
                        '.gi321-card'
                    );


                if (!card) {
                    return;
                }


                dashboardAction(
                    card.dataset.action
                );

            }
        );


    /* =====================================================
       SEARCH ALL LAYER ATTRIBUTES
       ===================================================== */

    function searchFeatures() {

        const search =
            document.querySelector(
                '#gi321-search'
            );


        const query =
            normalise(
                search.value
            );


        const status =
            document.querySelector(
                '#gi321-status'
            );


        if (!query) {

            status.textContent =
                'Enter a search value.';

            return;

        }


        const allFeatures = [

            ...culvertFeatures,

            ...outletFeatures,

            ...roadFeatures,

            ...gradientFeatures,

            ...riskFeatures,

            ...chainageFeatures

        ];


        const matches =
            allFeatures.filter(
                (feature) => {

                    const properties =
                        feature.getProperties();


                    return Object.entries(
                        properties
                    )
                    .filter(
                        ([key]) =>
                            key !==
                            'geometry'
                    )
                    .some(
                        ([, value]) =>

                            normalise(
                                value
                            ).includes(
                                query
                            )
                    );

                }
            );


        if (!matches.length) {

            status.textContent =
                `No features found for "${search.value}".`;

            return;

        }


        fitFeatures(
            matches
        );


        status.textContent =
            `${matches.length} matching feature(s) found.`;

    }


    document
        .querySelector(
            '#gi321-search-button'
        )
        .addEventListener(
            'click',
            searchFeatures
        );


    document
        .querySelector(
            '#gi321-search'
        )
        .addEventListener(
            'keydown',
            (event) => {

                if (
                    event.key ===
                    'Enter'
                ) {

                    searchFeatures();

                }

            }
        );


    /* =====================================================
       RESET
       ===================================================== */

    document
        .querySelector(
            '#gi321-reset'
        )
        .addEventListener(
            'click',
            () => {

                document.querySelector(
                    '#gi321-search'
                ).value =
                    '';


                conditionSelect.value =
                    '';


                activeCondition =
                    '';


                document.querySelector(
                    '#gi321-status'
                ).textContent =
                    'Dashboard reset.';

            }
        );


    /* =====================================================
       NORTH ARROW
       ===================================================== */

    const northArrow =
        document.querySelector(
            '#gi321-north-arrow'
        );


    function updateNorthArrow() {

        const rotation =
            map.getView()
                .getRotation() || 0;


        northArrow.style.transform =
            `rotate(${-rotation}rad)`;

    }


    map.getView().on(
        'change:rotation',
        updateNorthArrow
    );


    updateNorthArrow();


    /* =====================================================
       GLOBAL DASHBOARD OBJECT
       ===================================================== */

    window.GI321_DASHBOARD = {

        culvertLayer,

        outletLayer,

        roadLayer,

        gradientLayer,

        riskLayer,

        chainageLayer,

        perennialOutlets,

        applyCulvertFilter,

        searchFeatures

    };


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        'GI 321 Decision-Support Dashboard loaded.'
    );


    console.log(
        'Total culverts:',
        culvertFeatures.length
    );


    console.log(
        'Perennial outlets:',
        perennialOutlets.length
    );


})();
