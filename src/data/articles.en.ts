import type { ArticleContent } from './articles';
import { TOPICS_EN } from './articles.topics.en';

export const ARTICLES_EN: Record<string, ArticleContent> = {
  ...TOPICS_EN,
  ps_wood: {
    title: 'PS Wall Panels (Wood Alternative): What They Are, How They Are Made, Benefits and Installation',
    description:
      'A complete guide to PS wood-alternative wall panels in Syria: what they are made of, their advantages, water resistance, where to use them and how to install them step by step.',
    lead: 'Wood-alternative panels are the most requested wall cladding in Syria and the Arab world today: the warm, fluted look of timber with no damp, cracking or upkeep. This guide covers everything to know before you buy.',
    sections: [
      {
        id: 'what',
        heading: 'What are PS wall panels?',
        paragraphs: [
          'PS wall panels, also called wood-alternative or fluted slat panels, are wall cladding boards made from high-density compressed polystyrene with a surface that reproduces natural wood grain and colour. They come as long strips 12 to 16 cm wide and 290 cm long that interlock into one continuous wall.',
          'They exist for people who love timber in an interior but not its cost or its trouble with humidity and insects, which is why they are now the first choice for TV walls, living rooms, bedrooms and shops.',
        ],
      },
      {
        id: 'made',
        heading: 'How are they made?',
        paragraphs: [
          'Polystyrene (PS) granules are melted and pushed through a steel die in a process called extrusion, so the panel leaves the machine with its fluted 3D profile as one solid piece. After cooling it is cut to length.',
          'Finally the surface is wrapped with a heat-transfer decorative film carrying the wood pattern, bonded by heat and pressure so it becomes part of the panel. The result is a very light, closed-cell board that does not absorb water.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Benefits of PS wall panels',
        paragraphs: ['They combine looks with everyday practicality:'],
        bullets: [
          '100% water, moisture and mould proof: no swelling, no rot.',
          'Lightweight and easy to carry and fit without heavy tools.',
          'No painting or polishing; wipes clean with a damp cloth.',
          'Hides wall defects, cracks and cable runs.',
          'Adds a little sound and heat insulation.',
          'Works beautifully with concealed LED lighting.',
          'Many finishes: walnut, oak, black, grey, gold.',
        ],
      },
      {
        id: 'strength',
        heading: 'Durability and lifespan',
        paragraphs: [
          'Because each panel is one closed-cell piece, it is unaffected by the seasons and does not warp or split like natural timber or MDF, and it does not attract termites or woodworm.',
          'The surface stands up to daily use and repeated cleaning and keeps its colour for years indoors. As with any plastic, keep it away from direct high heat such as a heater placed against it.',
        ],
      },
      {
        id: 'where',
        heading: 'Where are they used?',
        paragraphs: [
          'The classic uses are the TV wall and main living-room wall, behind the bed, and in corridors and entrances. Commercially they suit shop interiors, restaurants and cafés, offices, clinics and salons.',
          'They can cover a whole wall or part of one alongside marble-look panels or paint, and can go on ceilings too. Their moisture resistance makes them ideal for coastal cities such as Lattakia and Tartus, where ordinary timber deteriorates quickly.',
        ],
      },
    ],
    compare: {
      other: 'Natural wood / MDF',
      rows: [
        ['Water & moisture', '100% resistant', 'Swells and rots'],
        ['Weight', 'Very light', 'Heavy'],
        ['Maintenance', 'None', 'Regular paint and polish'],
        ['Installation', 'Bond and interlock in hours', 'Joinery over days'],
        ['Insects', 'Unaffected', 'Vulnerable'],
        ['Cost', 'Economical', 'High'],
      ],
    },
  },

  pvc_marble: {
    title: 'PVC Marble Wall Panels (Marble Alternative): Complete Guide to Benefits, Manufacture and Installation',
    description:
      'Everything about UV-coated PVC marble panels in Syria: how they are made, their water resistance, use in bathrooms and kitchens, comparison with natural marble and how to install them.',
    lead: 'Marble-alternative panels give you the gloss and veining of natural marble with less weight, lower cost and far faster installation. This guide explains the material from factory to wall.',
    sections: [
      {
        id: 'what',
        heading: 'What are PVC marble panels?',
        paragraphs: [
          'PVC marble panels, also known as UV marble sheets, are thin rigid boards measuring 122 × 240 cm and about 2.5 mm thick, with a surface that reproduces natural marble veining in high-resolution print and a crystal-like gloss.',
          'They bond straight to a wall or over old ceramic tiles, covering a large area in one piece with very few joints. That is why they are so widely used to renew bathrooms and kitchens without demolition.',
        ],
      },
      {
        id: 'made',
        heading: 'How are they made?',
        paragraphs: [
          'The sheet is made from PVC resin blended with calcium carbonate (stone powder) and stabilisers, melted and extruded into a flat board of even thickness.',
          'A decorative film with the marble pattern is then pressed on, followed by a clear protective layer cured with ultraviolet light (UV coating). That layer is what gives the high gloss and the resistance to scratches, stains and yellowing.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Benefits of PVC marble panels',
        paragraphs: ['The main reasons they are a smart choice:'],
        bullets: [
          '100% water and moisture proof: suitable for bathrooms and kitchens.',
          'Crystal gloss and patterns matching premium marbles.',
          'One sheet covers about 2.9 m² with few joints.',
          'Fits over old tiles with no breaking out and no dust.',
          'Easy to clean; does not absorb grease or stains.',
          'Lightweight: no load on the wall.',
          'Far cheaper and faster than natural marble.',
        ],
      },
      {
        id: 'strength',
        heading: 'Durability and lifespan',
        paragraphs: [
          'The UV layer protects the surface from everyday scratches and colour change, and the board itself is unaffected by water or steam, so it will not swell or grow mould behind it when fitted correctly.',
          'Unlike natural marble it needs no periodic polishing and does not soak up stains. Seal the joints with silicone or aluminium trims in wet areas and the wall stays like new for years.',
        ],
      },
      {
        id: 'where',
        heading: 'Where are they used?',
        paragraphs: [
          'At home: bathroom and kitchen walls, the TV wall, the entrance wall, around vanities and on columns. In projects: hotel lobbies, shops, clinics, restaurants and showrooms.',
          'They pair well with wood-alternative panels on the same wall, and gold or silver trims between sheets add extra elegance.',
        ],
      },
    ],
    compare: {
      other: 'Natural marble / ceramic',
      rows: [
        ['Weight', 'Very light', 'Very heavy'],
        ['Installation', 'Direct bonding in a day', 'Cutting and cement over days'],
        ['Joints', 'Very few', 'Many'],
        ['Maintenance', 'Wipe clean', 'Periodic polishing'],
        ['Renew without demolition', 'Yes, over tiles', 'Old finish must come off'],
        ['Cost', 'Economical', 'High'],
      ],
    },
  },

  spc_wall: {
    title: 'SPC Wall Panels (Stone Composite Boards): Benefits, Manufacture and Uses',
    description:
      'A guide to SPC stone-composite wall panels in Syria: what they are, how they are made from stone powder, why they never swell in water, where they are used and how they are installed.',
    lead: 'SPC wall panels are rigid stone-polymer boards designed to solve the oldest problem of chipboard and MDF: swelling in water. This guide covers their make-up, advantages and uses.',
    sections: [
      {
        id: 'what',
        heading: 'What are SPC wall panels?',
        paragraphs: [
          'SPC stands for Stone Plastic Composite. SPC wall panels are rigid boards measuring 96 × 280 cm and 4 to 5 mm thick, with a core of compressed limestone powder and polymer and surfaces in stone, wood, fabric and metal looks.',
          'They are used where chipboard would be: cladding walls, columns and reception backdrops, but they are stiffer, thinner and completely unaffected by moisture.',
        ],
      },
      {
        id: 'made',
        heading: 'How are SPC panels made?',
        paragraphs: [
          'Calcium carbonate powder (around two thirds of the mix) is blended with PVC resin and stabilisers, then melted and extruded under high heat and pressure into a dense, perfectly flat rigid core.',
          'A decorative film and a clear wear-resistant layer are pressed on top and finished with a UV coating. All layers are fused by heat with no glue, so they do not separate over time.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Benefits of SPC wall panels',
        paragraphs: ['What sets them apart from engineered-wood boards:'],
        bullets: [
          'Never swells or warps in water.',
          'High rigidity; resists impact and scratches.',
          'Flame-retardant thanks to the high stone content.',
          'Unaffected by termites or mould.',
          '280 cm boards run floor to ceiling.',
          'Wide range: stone, travertine, wood, fabric, metal.',
          'No painting or routine maintenance.',
        ],
      },
      {
        id: 'strength',
        heading: 'Durability and lifespan',
        paragraphs: [
          'The dense stone core gives excellent dimensional stability, with no noticeable expansion or shrinkage as temperatures change, and it takes daily knocks in corridors and public areas.',
          'The surface layer resists scratching and fading, so it is used with confidence in busy commercial projects such as hotels, offices and shops.',
        ],
      },
      {
        id: 'where',
        heading: 'Where are they used?',
        paragraphs: [
          'Living rooms, corridors and entrances, offices and meeting rooms, hotel lobbies, shops and restaurants, as well as kitchens and damp areas.',
          'They are bonded directly with aluminium trims or fine joints between boards, and coordinate with wood-alternative panels and baseboards for a complete room finish.',
        ],
      },
    ],
    compare: {
      other: 'Chipboard / MDF',
      rows: [
        ['Effect of water', 'None', 'Swells and fails'],
        ['Rigidity', 'Very high', 'Medium'],
        ['Thickness', '4–5 mm', '16–18 mm'],
        ['Insects & mould', 'Unaffected', 'Vulnerable'],
        ['Finish', 'Ready, no paint', 'Needs veneer or paint'],
        ['Installation', 'Direct bonding', 'Joinery'],
      ],
    },
  },

  spc_flooring: {
    title: 'SPC Flooring (Parquet Alternative): Benefits, Drawbacks, Manufacture and Installation',
    description:
      'A guide to SPC click flooring in Syria: what it is, how it differs from timber parquet and laminate, its water resistance, where to lay it and how to install it over existing tiles.',
    lead: 'SPC flooring is the new generation of floors: the look and warmth of wood with a stone core that is not afraid of water. If you want to renew a floor without breaking out the tiles, this guide is for you.',
    sections: [
      {
        id: 'what',
        heading: 'What is SPC flooring?',
        paragraphs: [
          'SPC flooring is a rigid plank with a stone-polymer core and a wood or stone-look surface. Planks lock together with a click system and no glue, forming a floating floor over tiles or concrete.',
          'It comes 4.5 to 5.5 mm thick, and some models carry an IXPE acoustic layer underneath. Today it is the most popular alternative to timber parquet and laminate.',
        ],
      },
      {
        id: 'made',
        heading: 'How is SPC flooring made?',
        paragraphs: [
          'The core is extruded from limestone powder and PVC resin under high heat and pressure. A decorative wood-pattern layer is pressed on top, followed by a clear wear layer and a UV coating.',
          'After cooling, the click tongue and groove are milled into the edges with high precision, and the IXPE layer is bonded underneath on acoustic models.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Benefits of SPC flooring',
        paragraphs: ['Why homeowners and offices choose it:'],
        bullets: [
          '100% waterproof: no swelling from spills or mopping.',
          'Click installation with no glue and no tile removal.',
          'Wear layer resists scratches, chairs and furniture.',
          'Dimensionally stable: does not expand like laminate.',
          'Quiet, comfortable and warm underfoot.',
          'Easy to clean with ordinary mopping.',
          'Can be lifted and relaid when you move.',
        ],
      },
      {
        id: 'strength',
        heading: 'Durability',
        paragraphs: [
          'The stone core makes the plank extremely rigid, so heavy furniture legs do not leave permanent dents, and the wear layer determines how long the surface resists scratches and traffic.',
          'Because it absorbs no water it suits kitchens, entrances and even shops and clinics. Always leave a small expansion gap at the walls, later covered by the skirting.',
        ],
      },
      {
        id: 'where',
        heading: 'Where can it be laid?',
        paragraphs: [
          'Bedrooms, living rooms and children’s rooms, offices, shops and showrooms, clinics and kitchens. It can go directly over old tiles or marble as long as the floor is flat and dry.',
          'It is completed by waterproof PS baseboards that cover the expansion gap and protect the foot of the wall.',
        ],
      },
    ],
    compare: {
      other: 'Timber parquet / laminate',
      rows: [
        ['Water resistance', '100% waterproof', 'Swells and lifts'],
        ['Installation', 'Glue-free click', 'Glued or nailed'],
        ['Over old tiles', 'Yes, directly', 'Needs preparation'],
        ['Dimensional stability', 'Stable', 'Expands and shrinks'],
        ['Scratch resistance', 'High', 'Medium'],
        ['Maintenance', 'Mop only', 'Polish and special care'],
      ],
    },
  },

  ps_slats: {
    title: 'PS Wall Mouldings and Panelling: A Guide to French-Style Wall Frames',
    description:
      'A guide to PS decorative wall mouldings in Syria: what they are, how they are made, how to create French wall panelling with them, their advantages over plaster and wood, and installation.',
    lead: 'With PS mouldings a plain wall becomes classic French-style panelling at low cost and in a single day. Here is everything you need to know.',
    sections: [
      {
        id: 'what',
        heading: 'What are PS wall mouldings?',
        paragraphs: [
          'PS wall slats are decorative strips and frames made of high-density polystyrene, 240 cm long and from 1.5 to 10 cm wide, used to draw frames and panels on walls and around mirrors and doors.',
          'They come pre-finished or paintable, plain or ornate, and are also known as wall mouldings, panel mouldings or foam trims.',
        ],
      },
      {
        id: 'made',
        heading: 'How are they made?',
        paragraphs: [
          'Molten polystyrene is extruded through dies that give each strip its profile, then cooled and cut to standard lengths. The high density gives crisp, clean edges like machined timber.',
          'The surface is then finished with a colour coat or heat-applied decorative film, so the strips arrive ready to fit with no filler or sanding.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Benefits of PS mouldings',
        paragraphs: ['Compared with plaster and wood:'],
        bullets: [
          'Very light; bonded with no visible fixings.',
          'Water and moisture proof; does not crack like plaster.',
          'Cuts easily at 45° for neat corners.',
          'Paintable in any colour or left as supplied.',
          'Fast, clean work with no dust or drying time.',
          'Economical way to transform a room.',
        ],
      },
      {
        id: 'strength',
        heading: 'Durability',
        paragraphs: [
          'The strips absorb no moisture, so they do not warp or come away from the wall when bonded correctly, and their edges take everyday contact in corridors.',
          'Being so light, they add no load and can even be fitted on plasterboard.',
        ],
      },
      {
        id: 'where',
        heading: 'Where are they used?',
        paragraphs: [
          'Living rooms, dining rooms and bedrooms for French panelling, corridors and entrances, behind beds and TVs, and as frames for mirrors, artwork and doors.',
          'They coordinate perfectly with PS baseboards at the foot of the wall for a complete classic scheme.',
        ],
      },
    ],
    compare: {
      other: 'Plaster cornice / wood',
      rows: [
        ['Weight', 'Very light', 'Heavy'],
        ['Cracking', 'Does not crack', 'Plaster cracks'],
        ['Moisture', 'Unaffected', 'Affected'],
        ['Installation', 'Bonded in hours', 'Days of work and drying'],
        ['Cleanliness', 'No dust', 'Dust and filler'],
        ['Cost', 'Economical', 'Higher'],
      ],
    },
  },

  ps_baseboards: {
    title: 'Waterproof PS Baseboards: Types, Benefits and Installation',
    description:
      'A guide to PS skirting boards in Syria: why they outperform MDF and timber skirting, LED models, sizes, and where and how to fit them with parquet and ceramic floors.',
    lead: 'Skirting is a small detail that makes a big difference to a room. PS baseboards give a neat finish between floor and wall and are unaffected by mopping. This guide covers their types, benefits and fitting.',
    sections: [
      {
        id: 'what',
        heading: 'What are PS baseboards?',
        paragraphs: [
          'A baseboard (skirting) is the strip fixed at the foot of a wall where it meets the floor. PS baseboards are made of high-density polystyrene, 240 cm long and 10 to 11.5 cm high.',
          'They protect the wall from vacuum and furniture knocks and mop water, cover the expansion gap around parquet, and give the room a clean finishing line.',
        ],
      },
      {
        id: 'made',
        heading: 'How are they made?',
        paragraphs: [
          'The skirting is extruded from molten polystyrene in a die that gives its final section; some models are formed with a channel that takes an LED strip.',
          'The surface is then finished with a colour coat or scratch-resistant decorative film, ready to fit with no painting.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Benefits of PS baseboards',
        paragraphs: ['What sets them apart from MDF and timber:'],
        bullets: [
          '100% waterproof: no swelling when floors are mopped.',
          'Takes daily knocks without flaking.',
          'LED-channel models for soft floor lighting.',
          'Quick bonded installation with no visible fixings.',
          'Works with parquet, SPC and ceramic floors.',
          'No painting or maintenance.',
        ],
      },
      {
        id: 'strength',
        heading: 'Durability',
        paragraphs: [
          'The classic problem with MDF skirting is swelling and peeling after months of mopping. PS does not absorb water at all, so it stays straight and attached to the wall.',
          'Its density copes with repeated light impact, and the surface is easy to clean.',
        ],
      },
      {
        id: 'where',
        heading: 'Where are they used?',
        paragraphs: [
          'In every room and corridor, with SPC flooring to cover the expansion gap, and with ceramic or marble as a smart alternative to tile skirting.',
          'LED models suit corridors, bedrooms, living rooms and shops that want indirect lighting to highlight the floor.',
        ],
      },
    ],
    compare: {
      other: 'MDF / timber skirting',
      rows: [
        ['When mopping', 'Unaffected', 'Swells and peels'],
        ['Maintenance', 'None', 'Painting and repair'],
        ['Built-in LED', 'Available', 'Rarely available'],
        ['Installation', 'Quick bonding', 'Nails and filler'],
        ['Insects', 'Unaffected', 'Vulnerable'],
      ],
    },
  },
};
