import type { ArticleContent } from './articles';

/** Price, comparison and problem articles (English). Keys match ARTICLES[].key */
export const TOPICS_EN: Record<string, ArticleContent> = {
  cost: {
    label: 'Cladding cost',
    title: 'How Much Does Wall Cladding Cost in Syria? Everything That Sets the Price',
    description:
      'A practical guide to wall and floor cladding costs in Syria: what drives the price of PVC marble panels, PS wood-look panels and SPC flooring, how to work out your quantity, and how to get an exact quote on WhatsApp.',
    lead: 'The first question anyone renovating asks is "how much will it cost?". The answer depends on a handful of clear factors, and once you know them you can estimate your project before calling anyone. This guide explains what sets the price, how to calculate the quantity, and why ready-made cladding usually works out cheaper than traditional finishes.',
    sections: [
      {
        id: 'price',
        heading: 'Why we don’t list prices on the website',
        paragraphs: [
          'Building and decor material prices in Syria move with the exchange rate and with shipping costs from the factory, sometimes within a few weeks. We would rather give you a real, current price for your own quantity than leave an outdated number on a page that could mislead you.',
          'The good news is that working out the quantity is easy, and once you know how many panels you need, the price is a single WhatsApp message away. Larger quantities usually get a better price per square metre.',
        ],
      },
      {
        id: 'what',
        heading: 'What determines the cost?',
        paragraphs: ['These are the factors that make the difference on the final bill, from the biggest to the smallest:'],
        bullets: [
          'The real area: wall or floor area minus doors and windows, plus about 10% for cutting waste.',
          'The material: PVC marble panels, PS wood-look panels, SPC stone wall panels or SPC flooring, each with its own price per m².',
          'Model and finish: some high-gloss, gold-veined or thicker panels cost more than the core designs.',
          'Accessories: silicone or adhesive, trims and corners, mouldings and baseboards, and LED lighting if you want it.',
          'Wall condition: a flat wall needs nothing; a badly uneven wall may need light levelling or a simple frame.',
          'Installation: fitters usually charge by area and difficulty, far less than tiling or stone work.',
          'Delivery: we deliver to every governorate; the cost depends on the city and the size of the order.',
        ],
      },
      {
        id: 'calc',
        heading: 'How to calculate the quantity yourself',
        paragraphs: [
          'For walls: multiply width by height in metres, subtract doors and windows, then divide by the area of one panel. A PVC marble panel is 122 × 240 cm (about 2.93 m²); an SPC stone wall panel is 96 × 280 cm (about 2.69 m²).',
          'For floors: multiply length by width and divide by the area of one SPC tile (30.3 × 60.6 cm, about 0.18 m²). In both cases add 10% for waste and cuts around corners. The calculator below does all of this for you.',
        ],
      },
      {
        id: 'versus',
        heading: 'Is ready-made cladding cheaper than ceramic or marble?',
        paragraphs: [
          'Don’t compare the price per square metre alone. Ceramic and natural stone involve breaking out old tiles, removing rubble, cement and grout, many working days and cleaning up afterwards. Ready-made panels usually go straight over the existing surface in a day or two.',
          'That is why the total cost of panel cladding is lower on most projects, even when the price per m² is similar, and you can keep living at home during the work without dust and mess.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips to save money',
        paragraphs: [
          'Measure carefully and send us a photo of the wall: accurate measurements stop you buying extra panels. Order the full quantity at once so every panel comes from the same production batch and colour. Mix materials smartly: marble panels on the feature wall or bathroom, paint on the less visible walls.',
          'If your project is large, such as a whole flat or a shop, mention it in your message, because bigger orders usually get a better price.',
        ],
      },
    ],
    compare: {
      ours: 'Ready-made panels (PVC / SPC / PS)',
      other: 'Traditional ceramic and marble',
      rows: [
        ['Demolition and rubble removal', 'Usually not needed', 'Necessary and costly'],
        ['Time for one room', 'One to two days', 'A week or more'],
        ['Extra materials', 'Silicone and adhesive only', 'Cement, grout, tile adhesive'],
        ['Labour cost', 'Lower', 'Higher'],
        ['Later maintenance', 'Wipe with a damp cloth', 'Grout cleaning, replacing broken tiles'],
        ['Living at home during work', 'Possible, no mess', 'Hard because of dust'],
      ],
    },
  },

  pvc_vs_ceramic: {
    label: 'Marble panels or ceramic?',
    title: 'PVC Marble Panels or Ceramic Tiles? An Honest Comparison for Bathrooms, Kitchens and Living Rooms',
    description:
      'PVC marble wall panels versus ceramic tiles in Syria: looks, water resistance, installation speed, total cost, durability and maintenance, and when each one is the better choice.',
    lead: 'Ceramic has been the standard choice in Syria for decades, but PVC marble panels have become a strong rival, especially for renovations. Which one suits you? Here is an honest comparison, including the cases where we recommend ceramic.',
    sections: [
      {
        id: 'what',
        heading: 'The basic difference',
        paragraphs: [
          'Ceramic is small fired-clay tiles fixed with cement or adhesive, with grout filling the joints. A PVC marble panel is a large 122 × 240 cm sheet with a glossy printed marble surface protected by a UV coat, bonded straight onto the wall.',
          'That difference in size and fixing method drives most of the others: the number of joints, the speed of installation and whether anything has to be broken out.',
        ],
      },
      {
        id: 'benefits',
        heading: 'When marble panels win',
        paragraphs: ['PVC marble panels are the smarter choice in these cases:'],
        bullets: [
          'Renovating over old tiles in a bathroom or kitchen without demolition.',
          'When you want a luxury marble look with continuous veining, not a joint every 30 cm.',
          'When time matters: a whole room in one or two days.',
          'Walls with surface damp, because the panel does not absorb water.',
          'Rented flats or shops that need a fast refresh at the lowest cost.',
          'When you want to avoid grout that darkens and grows mould over time.',
        ],
      },
      {
        id: 'strength',
        heading: 'When ceramic is still better',
        paragraphs: [
          'For floors with very heavy traffic or metal furniture dragged across them, hard tiles remain stronger than wall panels. The wall directly behind an oven or hob needs a material that withstands high heat; there we recommend ceramic or glass.',
          'And if a wall is wet from inside because of a leak, neither ceramic nor panels are the answer until the water source is fixed. For ordinary flat floors, waterproof SPC flooring is an excellent alternative that feels warmer than ceramic.',
        ],
      },
      {
        id: 'where',
        heading: 'How to choose for your project',
        paragraphs: [
          'Bathroom: marble or SPC stone panels on the walls, keeping the floor tiles if they are sound, or covering them with SPC in relatively dry areas. Kitchen: marble panels on the walls, with a heat-resistant material directly behind the oven.',
          'Living rooms and bedrooms: marble panels on a feature wall or behind the TV, possibly mixed with wood-look panels for a modern look. Send us a photo of the space and we will suggest the best layout.',
        ],
      },
    ],
    compare: {
      ours: 'PVC marble panels',
      other: 'Ceramic tiles',
      rows: [
        ['Fitting over old tiles', 'Directly possible', 'Usually needs demolition'],
        ['Joints', 'Very few (122 × 240 cm sheet)', 'Every 30 to 60 cm'],
        ['Grout and mould', 'No grout', 'Darkens and needs cleaning'],
        ['Installation time', 'One to two days', 'About a week'],
        ['High heat resistance', 'Keep away from the hob', 'Excellent'],
        ['Luxury marble look', 'Continuous veins, high gloss', 'Limited by tile size'],
      ],
    },
  },

  spc_vs_parquet: {
    label: 'SPC or wood parquet?',
    title: 'SPC Flooring or Wood Parquet (Laminate)? Which Suits a Syrian Home?',
    description:
      'SPC flooring versus wood parquet and laminate in Syria: water and humidity resistance, durability, sound insulation, fitting over tiles, maintenance, and when to choose each.',
    lead: 'Parquet gives a home a warmth tiles never do, but many people have watched wood or laminate swell at the first water spill. SPC flooring was made to solve exactly that. Here is the difference in detail.',
    sections: [
      {
        id: 'what',
        heading: 'SPC, laminate and real wood: what is the difference?',
        paragraphs: [
          'Solid wood parquet is real timber: beautiful, but expensive and sensitive to water and humidity. Laminate, the common "parquet", is a printed wood layer on a compressed wood-fibre (HDF) core, and that wooden core is what swells when water reaches it.',
          'SPC has a core of limestone powder and polymer that is rigid and absorbs no water at all, topped with a decor layer and a scratch-resistant wear layer. Our SPC tiles are 30.3 × 60.6 cm and 5 to 5.5 mm thick, and some models come with a bonded IXPE acoustic underlay.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Why people choose SPC',
        paragraphs: ['What makes SPC a good fit for homes in Syria:'],
        bullets: [
          '100% waterproof: suitable for kitchens, hallways and even relatively dry bathrooms.',
          'No swelling or warping from coastal humidity or daily mopping.',
          'Click-lock installation over flat existing tiles, with no demolition and no glue.',
          'The IXPE layer softens footstep noise and feels warmer than tiles.',
          'Resistant to scratches and stains, cleaned with an ordinary mop.',
          'Wood, stone and marble designs in the same material.',
        ],
      },
      {
        id: 'strength',
        heading: 'Durability and upkeep',
        paragraphs: [
          'The stone core makes SPC more stable than laminate under heavy furniture and through summer–winter temperature swings. We still recommend felt pads under chair and table legs and not dragging metal furniture across it.',
          'Solid wood can be sanded and refinished after years, which is a real advantage. SPC and laminate cannot be sanded, but SPC keeps its shape far longer because water does not affect it.',
        ],
      },
      {
        id: 'where',
        heading: 'Which should you choose?',
        paragraphs: [
          'Choose SPC if you have children or pets, live in a humid coastal city, want one continuous floor from the living room through the kitchen and hallway, or want to fit over tiles without a building job.',
          'Choose solid wood if the budget is open, the room is always dry and you want the feel of real timber. Laminate is a budget option for dry bedrooms only, away from kitchens and bathrooms.',
        ],
      },
    ],
    compare: {
      ours: 'SPC flooring',
      other: 'Laminate / solid wood',
      rows: [
        ['Water resistance', '100% waterproof', 'Swells after leaks'],
        ['Kitchens and hallways', 'Suitable', 'Not recommended'],
        ['Fitting over tiles', 'Direct click-lock', 'Possible with underlay; wood needs preparation'],
        ['Stability in humidity', 'Stable', 'Expands and shrinks'],
        ['Refinishing by sanding', 'Not possible', 'Solid wood only'],
        ['Cost', 'Mid-range', 'Laminate lower, solid wood much higher'],
      ],
    },
  },

  ps_vs_wallpaper: {
    label: 'Wood panels or wallpaper?',
    title: 'PS Wood-Look Panels or Wallpaper? Which Lasts Longer and Looks Better',
    description:
      'PS wood-look wall panels versus wallpaper in Syria: 3D look, humidity resistance, lifespan, hiding wall defects, installation and long-term cost.',
    lead: 'Wallpaper is a quick, cheap way to change a room, but in damp homes it starts peeling within a season or two. PS wood-look panels create a feature wall that lasts for years. What is the real difference, and when is wallpaper enough?',
    sections: [
      {
        id: 'what',
        heading: 'Two very different materials',
        paragraphs: [
          'Wallpaper is a thin layer of printed paper or vinyl glued onto a perfectly smooth wall. PS wood-look panels are polystyrene boards 9 to 15 mm thick, 12 to 16 cm wide and 290 cm long, with a fluted 3D surface that imitates timber, fixed with silicone and a concealed interlocking joint.',
          'So wallpaper is a picture on the wall, while wood-look panels are real depth you can see and touch, with shadows that change with the light.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Where wood-look panels win',
        paragraphs: ['These are the advantages people pay the difference for:'],
        bullets: [
          'Resistant to humidity, water and mould, so they don’t peel or stain.',
          'They hide cracks and uneven walls, while wallpaper shows every flaw beneath it.',
          'A luxury 3D look that can be combined with hidden LED lighting.',
          'They withstand knocks and wiping with a damp cloth; wallpaper tears and marks.',
          'They last many years unchanged, so they cost less in the long run.',
          'They add a little acoustic comfort to the room.',
        ],
      },
      {
        id: 'strength',
        heading: 'When wallpaper is enough',
        paragraphs: [
          'If the room is dry, the wall is smooth and sound, and you want a temporary change on a small budget, or you like changing the decor every year or two, wallpaper is a reasonable choice. The same goes for children’s rooms that will change as they grow.',
          'But in coastal cities like Lattakia and Tartus, or on walls next to a bathroom or a cold outside wall, peeling paper and mould behind it are common, and wood-look panels are the better investment.',
        ],
      },
      {
        id: 'where',
        heading: 'Best places for wood-look panels',
        paragraphs: [
          'TV walls, the main living-room wall, behind the bed, entrances and hallways, offices and shops. For a classic look, PS mouldings can create French-style frames on a painted wall instead of wallpaper.',
          'Try cladding one feature wall and painting the rest: a big effect for a limited budget.',
        ],
      },
    ],
    compare: {
      ours: 'PS wood-look panels',
      other: 'Wallpaper',
      rows: [
        ['Humidity resistance', '100% resistant', 'Peels, mould grows behind it'],
        ['Hiding wall defects', 'Hides them', 'Shows them'],
        ['Look', '3D with real texture', 'Flat print'],
        ['Cleaning', 'Damp cloth', 'Stains and tears'],
        ['Lifespan', 'Many years', 'One to a few years'],
        ['Upfront cost', 'Higher', 'Lower'],
      ],
    },
  },

  damp_walls: {
    label: 'Damp walls solution',
    title: 'Damp and Mould on Walls: What Actually Works and What Doesn’t',
    description:
      'A practical guide to damp walls in Syria and on the coast: causes of damp, when to fix the source first, and how waterproof SPC and PVC panels end peeling paint, mould and yearly repainting.',
    lead: 'Paint that flakes every winter, black spots in the corners and a musty smell that never leaves. These are among the most common problems in Syrian homes, especially on the coast. There is no single fix for everyone, and the first step is knowing which kind of damp you have.',
    sections: [
      {
        id: 'damp',
        heading: 'Where does the damp come from?',
        paragraphs: [
          'There are three main sources. Condensation: steam from cooking, showers and breathing meets a cold wall, so mould appears in corners and behind wardrobes. Rising damp from the ground in ground-floor flats, showing as a wet band at the bottom of the wall. And leaks from pipes, the roof or a cracked outside wall.',
          'The distinction matters: condensation is treated with ventilation and a surface that doesn’t absorb water, while leaks and rising damp need the source fixed first.',
        ],
      },
      {
        id: 'strength',
        heading: 'Golden rule: fix the source before any cladding',
        paragraphs: [
          'No cladding material in the world repairs a water leak. If a wall is wet from inside because of a pipe or the roof, covering it with anything only hides the problem and can make it worse. Fix the leak, let the wall dry, and treat the mould with an anti-fungal product.',
          'We say this openly because we would rather not sell you panels for a place where they won’t work. When you send us a photo of the wall, we tell you whether it needs repairing before cladding.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Where waterproof panels solve the problem',
        paragraphs: ['Once the source is fixed, or when the problem is condensation and surface damp, SPC and PVC panels give you:'],
        bullets: [
          'A sealed surface that absorbs no water, so no peeling or bubbling like paint and plaster.',
          'Nowhere for mould to grow on the surface, and it wipes clean with a damp cloth.',
          'An end to repainting every year, a recurring cost that adds up.',
          'Fitting over the old wall without demolition, once it is cleaned and dry.',
          'Waterproof PS baseboards protect the bottom of the wall from mopping water.',
          'A luxury marble or stone look instead of a tired wall.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tips to stop damp coming back',
        paragraphs: [
          'Air the home every day, even for a few minutes, especially after showers and cooking, and fit an extractor fan in the bathroom and kitchen if you can. Keep wardrobes a few centimetres away from outside walls so air can move behind them.',
          'When installing, leave a small expansion gap at the floor and ceiling as our fitters do, and use anti-fungal silicone in corners and edges, especially in bathrooms.',
        ],
      },
    ],
    compare: {
      ours: 'Waterproof SPC / PVC panels',
      other: 'Ordinary paint and plaster',
      rows: [
        ['Water absorption', 'None', 'Absorbs and swells'],
        ['Peeling', 'Does not peel', 'Often peels every winter'],
        ['Mould on the surface', 'Hard to grow, easy to wipe', 'Common'],
        ['Recurring cost', 'No repainting', 'Repaint every year or two'],
        ['Fixing the leak itself', 'No (fix it first)', 'No'],
      ],
    },
  },

  bathroom_no_demolition: {
    label: 'Bathroom without demolition',
    title: 'Renovating a Bathroom Without Demolition: Steps, Materials and Time',
    description:
      'How to renovate your bathroom in Syria without breaking tiles: PVC marble or SPC panels over old tiles, covering the floor, time, steps and the mistakes to avoid.',
    lead: 'Breaking out bathroom tiles means a week or more of dust, rubble and a bathroom you can’t use. Today you can completely change the look of a bathroom over the old tiles in one or two days. Here is how it is done and what to check before you start.',
    sections: [
      {
        id: 'bathroom',
        heading: 'Can you really clad over old tiles?',
        paragraphs: [
          'Yes, as long as the tiles are firmly fixed and the wall is dry with no leak behind it. The tiles are cleaned of grease and soap residue, then PVC marble or SPC stone panels are bonded directly over them with the right silicone or adhesive.',
          'Any broken or hollow-sounding tiles are re-fixed or removed individually, with no need to break out the whole bathroom.',
        ],
      },
      {
        id: 'what',
        heading: 'Which material for each part of the bathroom?',
        paragraphs: [
          'Walls: PVC marble panels in large 122 × 240 cm sheets give a continuous marble look with few joints, or SPC stone wall panels (96 × 280 cm, 4 to 5 mm) for extra rigidity in the shower area.',
          'Floor: if the tiles are sound you can keep them and change only the walls, which already makes a big difference. In relatively dry bathrooms or a guest toilet, the floor can be covered with waterproof click-lock SPC tiles. The shower floor itself stays tiled with a proper fall to the drain.',
        ],
      },
      {
        id: 'benefits',
        heading: 'What you gain by not demolishing',
        paragraphs: ['Compared with a traditional renovation, these are the main gains:'],
        bullets: [
          'Time: one to two days instead of a week or more.',
          'No dust, no rubble and no debris to remove.',
          'No risk to old pipes buried in the wall.',
          'No grout to darken over time, and much easier cleaning.',
          'Usually a lower total cost, because you save demolition, cement and labour days.',
          'A modern, hotel-style look in glossy marble or natural stone.',
        ],
      },
      {
        id: 'tips',
        heading: 'Mistakes to avoid',
        paragraphs: [
          'Don’t clad a wall with a leak: check the plumbing first, because cladding hides the problem without solving it. Don’t skimp on silicone around the bath, corners and openings; it is your line of defence against water, so choose an anti-fungal type.',
          'Plan where taps, accessories and mirrors go before installing so the openings are cut precisely, and keep the panels away from strong direct heat. If you are not sure about the state of the wall, send us a photo on WhatsApp before buying.',
        ],
      },
    ],
    compare: {
      ours: 'Renovation without demolition',
      other: 'Traditional (demolition and new tiles)',
      rows: [
        ['Time', 'One to two days', 'One to two weeks'],
        ['Dust and rubble', 'Almost none', 'A lot'],
        ['Old pipes', 'Left untouched', 'Can be damaged'],
        ['Joints and grout', 'Few / no grout', 'Grout between every tile'],
        ['Using the bathroom', 'Back in use quickly', 'Out of action throughout'],
        ['Shower floor', 'Stays tiled', 'New tiles'],
      ],
    },
  },
};
