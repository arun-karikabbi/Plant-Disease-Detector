/**
 * LeafCare AI — API Service
 *
 * Currently returns realistic mock responses so the frontend works standalone.
 * Update API_BASE_URL (or set VITE_API_BASE_URL) and replace the mock logic
 * inside each function with `fetch(...)` calls when connecting to your Flask backend.
 */

export const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000';

export const STORAGE_KEY = 'leafcare_scans_v1';
export const STORAGE_INIT_KEY = 'leafcare_scans_initialized_v1';

export const SAMPLE_LEAF_IMAGES = {
  tomato_early_blight: '/src/assets/images/leaf_tomato_early_blight_1795498815137.jpg',
  tomato_healthy: '/src/assets/images/leaf_tomato_healthy_1795498815425.jpg',
  potato_late_blight: '/src/assets/images/leaf_potato_late_blight_1795498814996.jpg',
  corn_common_rust: '/src/assets/images/leaf_corn_rust_1795498816983.jpg',
  apple_scab: '/src/assets/images/leaf_apple_scab_1795498815948.jpg',
};

export const SUPPORTED_CROPS = [
  'Tomato',
  'Potato',
  'Apple',
  'Grape',
  'Corn',
  'Pepper',
];

export const DISEASE_DATABASE = {
  tomato_early_blight: {
    id: 'tomato_early_blight',
    crop: 'Tomato',
    disease: 'Early Blight',
    status: 'caution',
    cause: 'Fungal',
    severity: 'Moderate — spreads steadily in warm, humid weather',
    description:
      'Early blight is a common fungal infection caused by Alternaria solani. It usually appears first on older lower leaves as dark brown spots with concentric rings that look like a target, often surrounded by a yellow halo.',
    symptoms: [
      'Dark brown circular spots with target-like rings on older leaves',
      'Yellowing leaf tissue around the brown lesions',
      'Leaves dry up and drop early, exposing fruit to sunscald',
    ],
    treatment: [
      'Prune and destroy infected lower leaves away from the field.',
      'Apply copper-based or neem organic fungicide every 7–10 days.',
      'Water at the base of plants early in the morning so leaves stay dry.',
    ],
    culturalSteps: [
      'Remove heavily spotted lower leaves with clean shears and burn or bury them away from your plot.',
      'Water the soil around the roots rather than overhead so fungal spores do not splash upward.',
      'Add dry straw or grass mulch under plants to block soil spores from bouncing onto leaves.',
    ],
    organicSteps: [
      'Spray approved copper fungicide or neem oil spray thoroughly on both sides of leaves.',
      'Repeat spraying every 7 to 10 days after rain or heavy morning dew.',
    ],
    chemicalSteps: [
      'If spread continues rapidly, use a locally recommended protectant fungicide such as mancozeb or chlorothalonil.',
      'Follow the exact label dilution and wait the required days before harvesting.',
    ],
    safetyNote:
      'Always wear gloves and cover your nose and mouth when mixing or spraying. Wash hands and wait the pre-harvest interval listed on the product label before picking tomatoes.',
    prevention: [
      'Rotate tomatoes away from potatoes, eggplants, and peppers for at least 2–3 seasons.',
      'Space plants 50–60 cm apart and stake stems for strong airflow.',
      'Clear and remove all dead crop debris after final harvest.',
      'Choose early-blight tolerant tomato varieties for the next planting.',
    ],
  },
  tomato_late_blight: {
    id: 'tomato_late_blight',
    crop: 'Tomato',
    disease: 'Late Blight',
    status: 'urgent',
    cause: 'Fungal',
    severity: 'High — can destroy plants within days in cool, wet weather',
    description:
      'Late blight is an aggressive water-mold infection (Phytophthora infestans) that spreads rapidly during cool nights and wet or foggy mornings. It causes dark, water-soaked blotches on leaves and stems and can quickly rot green fruit.',
    symptoms: [
      'Irregular dark greenish-black water-soaked patches on leaf tips and edges',
      'White fuzzy mold visible on the underside of wet leaves in the morning',
      'Dark brown streaks along stems and firm brown rot on fruits',
    ],
    treatment: [
      'Immediately cut and bag infected stems and leaves; do not compost them.',
      'Apply a targeted systemic and protectant fungicide right away.',
      'Avoid walking through wet plants so spores do not spread down rows.',
    ],
    culturalSteps: [
      'Remove and destroy badly infected plants immediately to protect neighboring healthy rows.',
      'Stop overhead irrigation at once and improve drainage around beds.',
      'Never leave pulled blight plants near the field or in a compost pile.',
    ],
    organicSteps: [
      'Copper hydroxide sprays can slow down early spread on nearby healthy plants when applied before rain.',
      'Organic sprays alone rarely stop advanced late blight; act fast with removal first.',
    ],
    chemicalSteps: [
      'Apply a recommended late-blight fungicide (such as metalaxyl-m + mancozeb or cymoxanil formulations) according to local extension guidance.',
      'Cover upper and lower leaf surfaces completely before forecasted wet weather.',
    ],
    safetyNote:
      'Wear protective gloves, long sleeves, and eye protection while spraying. Observe the full pre-harvest waiting period before selling or eating fruit.',
    prevention: [
      'Plant certified disease-free seedlings and inspect undersides of leaves weekly.',
      'Use wide row spacing and prune lower suckers to dry foliage fast after rain.',
      'Rotate out of tomato and potato crops for 3 years.',
      'Plant late-blight resistant hybrid varieties where available locally.',
    ],
  },
  potato_late_blight: {
    id: 'potato_late_blight',
    crop: 'Potato',
    disease: 'Late Blight',
    status: 'urgent',
    cause: 'Fungal',
    severity: 'High — urgent action needed to save tubers and nearby rows',
    description:
      'Potato late blight is caused by Phytophthora infestans. Dark, water-soaked spots expand rapidly across leaflets with pale yellow-green halos, and spores wash down into the soil to infect developing potato tubers.',
    symptoms: [
      'Large dark brown or black blotches starting at leaf edges and tips',
      'Pale yellowish-green border around dark wet lesions',
      'Faint white powdery ring on the leaf underside during humid mornings',
    ],
    treatment: [
      'Remove and safely destroy infected foliage away from the potato field.',
      'Apply recommended blight fungicide immediately to protect healthy hills.',
      'Hill soil firmly around potato stems to shield tubers from washing spores.',
    ],
    culturalSteps: [
      'Pull or cut off severely blighted tops and dispose of them far from the field.',
      'Build soil ridges (hilling) high around plant bases so rain does not carry spores down to tubers.',
      'Wait 10–14 days after vines die completely before digging tubers for storage.',
    ],
    organicSteps: [
      'Spray fixed copper fungicide preventatively on healthy neighboring rows before rain.',
    ],
    chemicalSteps: [
      'Use a locally approved potato late-blight fungicide (e.g., cymoxanil + mancozeb or mandipropamid) following local agri-dealer rates.',
      'Alternate active ingredients if repeat applications are needed.',
    ],
    safetyNote:
      'Do not spray in strong wind or midday heat. Wear gloves, mask, and wash skin thoroughly with soap and water afterward.',
    prevention: [
      'Always plant clean, certified seed tubers—never save seed from blighted fields.',
      'Destroy volunteer potato plants sprouting from last season.',
      'Avoid planting potatoes next to tomatoes.',
      'Select blight-tolerant potato varieties suited to your rainfall zone.',
    ],
  },
  apple_scab: {
    id: 'apple_scab',
    crop: 'Apple',
    disease: 'Apple Scab',
    status: 'caution',
    cause: 'Fungal',
    severity: 'Moderate — weakens leaves and marks developing fruit',
    description:
      'Apple scab is caused by the fungus Venturia inaequalis. It thrives in cool, rainy spring weather, producing olive-green to dark brown velvety spots on leaves and corky scabs on apples.',
    symptoms: [
      'Olive-green to dark velvety circular spots on upper leaf surfaces',
      'Puckered, twisted, or yellowing leaves that drop early',
      'Rough dark scab spots on young developing apples',
    ],
    treatment: [
      'Rake and remove fallen leaves under trees to cut spore carryover.',
      'Prune dense inner branches to open the canopy to sun and wind.',
      'Apply sulfur or copper spray during wet spring growth stages.',
    ],
    culturalSteps: [
      'Collect and burn or bury fallen scabbed leaves from around the tree base.',
      'Prune crossing branches during dormancy so leaves dry quickly after rain.',
    ],
    organicSteps: [
      'Apply wettable sulfur or potassium bicarbonate sprays every 7–10 days during wet weather.',
      'Avoid spraying sulfur when temperatures exceed 29°C (85°F) to prevent leaf burn.',
    ],
    chemicalSteps: [
      'Apply a registered orchard fungicide such as captan or myclobutanil from bud break through early fruit set if scab pressure is severe.',
    ],
    safetyNote:
      'Keep livestock and children out of the orchard until sprays dry completely. Wear protective eye gear and gloves when spraying overhead trees.',
    prevention: [
      'Clean up all fallen apple leaves every autumn or dry season.',
      'Maintain an open tree canopy through annual pruning.',
      'Plant scab-resistant apple varieties when adding new trees.',
    ],
  },
  corn_common_rust: {
    id: 'corn_common_rust',
    crop: 'Corn',
    disease: 'Common Rust',
    status: 'caution',
    cause: 'Fungal',
    severity: 'Low to Moderate — monitor spread during cool, moist weeks',
    description:
      'Common rust (Puccinia sorghi) causes small, raised reddish-brown pustules scattered across both upper and lower surfaces of maize leaves. Wind carries spores across fields during cool, humid conditions.',
    symptoms: [
      'Small cinnamon-brown or rust-colored powdery bumps on both sides of leaves',
      'Pustules turn dark brown to black as the crop matures',
      'Yellowing around dense clusters of pustules in heavy infections',
    ],
    treatment: [
      'Most field corn tolerates mild rust without spraying.',
      'For sweet corn or heavy early infection, apply a labeled fungicide before tasseling.',
      'Keep weeds down and ensure balanced potassium and nitrogen nutrition.',
    ],
    culturalSteps: [
      'Check upper leaves near the ear; if less than 15% of leaf area has pustules on mature plants, spraying is usually not economical.',
      'Control grassy weeds between rows to improve air movement.',
    ],
    organicSteps: [
      'Sulfur or neem sprays can reduce spore germination on small sweet-corn plots if caught very early.',
    ],
    chemicalSteps: [
      'If rust spreads rapidly onto upper ear leaves before silking, consult your local agri-advisor about a triazole or strobilurin foliar fungicide.',
    ],
    safetyNote:
      'Read label instructions carefully before spraying tall maize plants. Never spray above head height without protective mask and goggles.',
    prevention: [
      'Plant rust-resistant hybrid maize seed recommended for your region.',
      'Plant early in the rainy season so crops mature before peak rust spore build-up.',
      'Rotate corn with legumes such as beans or groundnuts.',
    ],
  },
  tomato_healthy: {
    id: 'tomato_healthy',
    crop: 'Tomato',
    disease: 'Healthy Leaf',
    status: 'healthy',
    cause: 'Healthy',
    severity: 'None — plant foliage looks strong and disease-free',
    description:
      'Great news! This leaf shows uniform natural green color, healthy veins, and no visible fungal spots, mold, pest damage, or viral mottling.',
    symptoms: [
      'Even, healthy green leaf color without spots or halos',
      'Firm leaf structure with clean edges and undamaged veins',
    ],
    treatment: [
      'No chemical or organic treatment is needed right now.',
      'Continue regular soil-level watering and weekly field checks.',
    ],
    culturalSteps: [
      'Keep watering steadily at the base of the plant to avoid moisture stress.',
      'Inspect the undersides of older lower leaves once a week after rain.',
    ],
    organicSteps: [
      'Maintain healthy soil with compost or well-rotted manure mulch.',
    ],
    chemicalSteps: [
      'No spray required. Avoid unnecessary spraying to protect helpful bees and ladybugs.',
    ],
    safetyNote:
      'Clean tools and wash hands when moving between different crop plots to keep plants healthy.',
    prevention: [
      'Keep weeds cleared around plant stems for steady airflow.',
      'Water early in the morning so any splashes dry quickly in daylight.',
      'Rotate crops each season to keep soil healthy.',
    ],
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

function buildTop3(primaryKey, primaryConfidence) {
  const alternatives = {
    tomato_early_blight: ['Tomato · Septoria Leaf Spot', 'Tomato · Late Blight'],
    tomato_late_blight: ['Tomato · Early Blight', 'Tomato · Bacterial Spot'],
    potato_late_blight: ['Potato · Early Blight', 'Potato · Healthy Leaf'],
    apple_scab: ['Apple · Cedar Apple Rust', 'Apple · Black Rot'],
    corn_common_rust: ['Corn · Northern Leaf Blight', 'Corn · Gray Leaf Spot'],
    tomato_healthy: ['Tomato · Early Stage Deficiency', 'Pepper · Healthy Leaf'],
  };
  const alts = alternatives[primaryKey] || ['Healthy Leaf', 'Early Blight'];
  const remainder = Math.max(2, 100 - primaryConfidence);
  const second = Math.max(1, Math.round(remainder * 0.65));
  const third = Math.max(1, remainder - second);

  const primary = DISEASE_DATABASE[primaryKey];
  return [
    { disease: `${primary.crop} · ${primary.disease}`, confidence: primaryConfidence },
    { disease: alts[0], confidence: second },
    { disease: alts[1], confidence: third },
  ];
}

function pickPredictionFromName(fileName, fileSize = 0) {
  const lower = (fileName || '').toLowerCase();

  if (
    lower.includes('nonleaf') ||
    lower.includes('non_leaf') ||
    lower.includes('selfie') ||
    lower.includes('person') ||
    lower.includes('car') ||
    lower.includes('dog') ||
    lower.includes('cat') ||
    lower.includes('receipt')
  ) {
    return { error: 'non_leaf' };
  }

  if (lower.includes('uncertain') || lower.includes('blur') || lower.includes('dark')) {
    return { key: 'tomato_early_blight', confidence: 52 };
  }
  if (lower.includes('healthy') || lower.includes('good') || lower.includes('fresh')) {
    return { key: 'tomato_healthy', confidence: 96 };
  }
  if (lower.includes('potato')) {
    return { key: 'potato_late_blight', confidence: 91 };
  }
  if (lower.includes('late')) {
    return { key: 'tomato_late_blight', confidence: 89 };
  }
  if (lower.includes('apple') || lower.includes('scab')) {
    return { key: 'apple_scab', confidence: 87 };
  }
  if (lower.includes('corn') || lower.includes('maize') || lower.includes('rust')) {
    return { key: 'corn_common_rust', confidence: 84 };
  }
  if (lower.includes('early') || lower.includes('blight') || lower.includes('tomato')) {
    return { key: 'tomato_early_blight', confidence: 92 };
  }

  // Deterministic realistic fallback based on filename & size
  const keys = [
    { key: 'tomato_early_blight', confidence: 91 },
    { key: 'potato_late_blight', confidence: 88 },
    { key: 'corn_common_rust', confidence: 85 },
    { key: 'apple_scab', confidence: 86 },
    { key: 'tomato_healthy', confidence: 94 },
    { key: 'tomato_late_blight', confidence: 54 }, // exercises low-confidence banner occasionally
  ];
  const hash =
    (lower.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) + fileSize) %
    keys.length;
  return keys[hash];
}

/**
 * POST /api/predict
 * Predicts plant disease from an uploaded File or a sample leaf preset.
 */
export async function predictDisease(imageFile, options = {}) {
  // Check real offline status
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    const err = new Error('No internet connection detected.');
    err.code = 'NO_INTERNET';
    throw err;
  }

  await delay(1450);

  if (options.simulateError) {
    const err = new Error('Simulated error');
    err.code = options.simulateError;
    throw err;
  }

  let sampleKey = options.sampleKey;
  let confidence = options.confidenceOverride;
  let imageUrl = options.previewUrl || '';
  const fileName = imageFile?.name || options.fileName || 'leaf_photo.jpg';

  if (imageFile && !sampleKey) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile.type && !validTypes.includes(imageFile.type.toLowerCase())) {
      const err = new Error('Unsupported image format. Please use JPG or PNG.');
      err.code = 'UNSUPPORTED_IMAGE';
      throw err;
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      const err = new Error('Image is larger than 5 MB. Please pick a smaller photo.');
      err.code = 'UPLOAD_FAILED';
      throw err;
    }

    const picked = pickPredictionFromName(fileName, imageFile.size);
    if (picked.error === 'non_leaf') {
      const err = new Error(
        'We could not spot a clear plant leaf in this photo. Please take a close-up of a single leaf.'
      );
      err.code = 'NON_LEAF';
      throw err;
    }
    sampleKey = picked.key;
    confidence = picked.confidence;

    if (!imageUrl || imageUrl.startsWith('blob:')) {
      try {
        imageUrl = await fileToDataUrl(imageFile);
      } catch {
        // Fallback to existing preview URL if FileReader fails
      }
    }
  }

  if (!sampleKey || !DISEASE_DATABASE[sampleKey]) {
    sampleKey = 'tomato_early_blight';
  }
  if (typeof confidence !== 'number') {
    const defaultConf = {
      tomato_early_blight: 92,
      tomato_late_blight: 89,
      potato_late_blight: 91,
      apple_scab: 87,
      corn_common_rust: 85,
      tomato_healthy: 96,
    };
    confidence = defaultConf[sampleKey] || 88;
  }

  const info = DISEASE_DATABASE[sampleKey];
  const result = {
    id: `scan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    diseaseId: info.id,
    crop: info.crop,
    disease: info.disease,
    confidence,
    status: info.status,
    timestamp: new Date().toISOString(),
    imageUrl: imageUrl || SAMPLE_LEAF_IMAGES[sampleKey] || SAMPLE_LEAF_IMAGES.tomato_early_blight,
    top3: buildTop3(sampleKey, confidence),
    info,
  };

  saveScanToLocalHistory(result);
  return result;
}

/**
 * GET /api/disease/{id}
 */
export async function getDiseaseInfo(id) {
  await delay(220);
  const found = DISEASE_DATABASE[id];
  if (!found) {
    throw new Error('Disease information not found.');
  }
  return found;
}

/**
 * POST /api/chat
 * Context-aware farming advisor responses with sources, uncertainty fallback, and topic guardrails.
 */
export async function sendChatMessage(message, diseaseContext = null) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    const err = new Error('No internet connection.');
    err.code = 'NO_INTERNET';
    throw err;
  }

  await delay(750);

  const text = (message || '').trim();
  const lower = text.toLowerCase();

  // Polite decline for non-farming topics
  const nonFarmingKeywords = [
    'movie',
    'football',
    'soccer',
    'crypto',
    'bitcoin',
    'stock market',
    'python code',
    'javascript',
    'write an essay',
    'politics',
    'election',
    'celebrity',
    'video game',
    'math homework',
    'recipe for cake',
  ];
  if (nonFarmingKeywords.some((kw) => lower.includes(kw))) {
    return {
      reply:
        "I am a plant health and farming advisor, so I can only help with crop diseases, leaf care, spraying safety, and field prevention. Ask me anything about your crops!",
    };
  }

  // Unknown / local-specific questions that require an extension officer
  const unknownKeywords = [
    'price',
    'cost in',
    'shop near',
    'subsidy',
    'loan',
    'exact brand',
    'dosage in ml for',
    'weather tomorrow',
    'rain next week',
  ];
  if (unknownKeywords.some((kw) => lower.includes(kw))) {
    return {
      reply:
        "I do not have reliable local store prices, exact regional brand availability, or live weather data for your area. Please check with your local agricultural extension officer or trusted farm supply dealer for exact local products and rates.",
    };
  }

  const crop = diseaseContext?.crop || 'crop';
  const disease = diseaseContext?.disease || '';
  const info =
    (diseaseContext?.diseaseId && DISEASE_DATABASE[diseaseContext.diseaseId]) || null;

  // Healthy leaf questions
  if (diseaseContext?.status === 'healthy' || disease === 'Healthy Leaf') {
    if (lower.includes('spray') || lower.includes('treat')) {
      return {
        reply: `Your ${crop.toLowerCase()} leaf looks healthy, so you do not need to spray any fungicide or pesticide right now. Save your money and protect helpful insects by sticking to good watering and weekly leaf checks.`,
        source: {
          title: 'IPM Field Care Guidelines',
          snippet:
            'Preventative chemical spraying on healthy, symptom-free foliage is unnecessary unless local outbreak warnings are active.',
        },
      };
    }
    if (lower.includes('harvest')) {
      return {
        reply: `Yes! Since your ${crop.toLowerCase()} plant appears healthy and free of recent sprays, it is safe to harvest ripe produce as normal.`,
      };
    }
    return {
      reply: `Your ${crop.toLowerCase()} leaf is in great shape! Keep watering at the soil level in the morning, mulch under the plants, and inspect lower leaves once a week so you catch any spots early.`,
      source: {
        title: 'Smallholder Crop Maintenance Guide',
        snippet:
          'Morning root-zone irrigation keeps foliage dry through the day and lowers fungal infection risk by over 50%.',
      },
    };
  }

  // Context-specific answers when a disease is active
  if (info) {
    if (lower.includes('spray') || lower.includes('chemical') || lower.includes('organic') || lower.includes('fungicide') || lower.includes('medicine')) {
      return {
        reply: `For ${info.crop} ${info.disease}, first remove badly spotted leaves. You can start with ${info.organicSteps[0]} ${info.chemicalSteps[0] ? `If it keeps spreading, ${info.chemicalSteps[0]}` : ''} Always wear gloves and follow the label waiting days.`,
        source: {
          title: `${info.crop} Disease Management Bulletin`,
          snippet: `${info.organicSteps[0]} ${info.safetyNote}`,
        },
      };
    }

    if (lower.includes('spread') || lower.includes('stop') || lower.includes('other plant') || lower.includes('neighbor')) {
      return {
        reply: `To stop ${info.disease} from spreading to nearby ${info.crop.toLowerCase()} plants: 1) Carefully remove infected leaves into a closed bag—do not drop them on the soil. 2) Stop overhead watering so droplets do not carry spores. 3) Wash your hands and tools before touching healthy rows.`,
        source: {
          title: 'Field Sanitation & Containment Protocol',
          snippet:
            'Avoid working in wet foliage. Fungal and bacterial spores travel rapidly on wet hands, pruning knives, and splashed water droplets.',
        },
      };
    }

    if (lower.includes('harvest') || lower.includes('eat') || lower.includes('safe') || lower.includes('sell')) {
      if (info.disease === 'Late Blight') {
        return {
          reply: `Healthy-looking fruit or tubers can still be harvested if they have no dark rot spots, but check carefully and keep them separate from diseased ones so rot does not spread in storage. If you recently sprayed a fungicide, always wait the full pre-harvest interval printed on the bottle before eating or selling.`,
          source: {
            title: 'Post-Harvest Safety & Late Blight Care',
            snippet:
              'Never store blighted produce with clean harvest; sort immediately and respect chemical pre-harvest intervals.',
          },
        };
      }
      return {
        reply: `Yes, undamaged fruit from your ${info.crop.toLowerCase()} plants is generally safe to eat and sell once washed cleanly. Just remember: if you sprayed any treatment, wait the exact number of pre-harvest days listed on the product label.`,
        source: {
          title: 'Food Safety & Pre-Harvest Intervals',
          snippet:
            'Foliar blights and rusts affect plant vigor and yield; wash clean produce well and always honor fungicide waiting periods.',
        },
      };
    }

    if (lower.includes('water') || lower.includes('rain') || lower.includes('irrigat')) {
      return {
        reply: `With ${info.disease}, water only at the soil base early in the morning. Avoid wetting the leaves or watering in the evening, because damp overnight foliage helps ${info.cause.toLowerCase()} spores grow fast.`,
        source: {
          title: 'Irrigation Practices for Disease Control',
          snippet:
            'Morning base-watering ensures leaves dry quickly in daylight, breaking the moisture cycle needed for spore germination.',
        },
      };
    }

    if (lower.includes('next') || lower.includes('prevent') || lower.includes('season') || lower.includes('again')) {
      return {
        reply: `Next season, prevent ${info.disease} by following these steps: ${info.prevention.slice(0, 3).join(' ')}`,
        source: {
          title: 'Seasonal Crop Rotation Guide',
          snippet: info.prevention.join(' '),
        },
      };
    }

    return {
      reply: `Based on your scan of ${info.crop} ${info.disease} (${info.cause.toLowerCase()}): ${info.description} The best first step right now is: ${info.culturalSteps[0]} Would you like advice on spraying, stopping spread, or safe harvesting?`,
      source: {
        title: `${info.crop} Pathology Summary`,
        snippet: info.symptoms.join(' · '),
      },
    };
  }

  // General farming advice (no active scan context)
  if (lower.includes('spray') || lower.includes('blight') || lower.includes('spot')) {
    return {
      reply:
        'Before spraying anything, scan a close-up leaf photo on the Home screen so I know which crop and disease you have. In general, remove spotted lower leaves first and water at the soil base in the morning.',
    };
  }

  return {
    reply:
      'I can help you identify leaf problems, choose safe organic or chemical treatments, and prevent crop disease spread. Scan a leaf on the Home tab or ask a specific question about your crop!',
  };
}

/**
 * GET /api/scans
 * Reads scan history from localStorage (structured for future Firebase migration).
 */
export async function getScans() {
  await delay(250);
  try {
    const initialized = localStorage.getItem(STORAGE_INIT_KEY);
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!initialized && !raw) {
      const seedScans = createInitialSampleScans();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedScans));
      localStorage.setItem(STORAGE_INIT_KEY, 'true');
      return seedScans;
    }

    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveScanToLocalHistory(scan) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const updated = [scan, ...(Array.isArray(existing) ? existing : [])].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(STORAGE_INIT_KEY, 'true');
    return updated;
  } catch {
    return [scan];
  }
}

export function deleteScanFromLocalHistory(scanId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const updated = (Array.isArray(existing) ? existing : []).filter(
      (item) => item.id !== scanId
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(STORAGE_INIT_KEY, 'true');
    return updated;
  } catch {
    return [];
  }
}

export function clearLocalHistory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(STORAGE_INIT_KEY, 'true');
  } catch {
    // ignore storage errors
  }
  return [];
}

function createInitialSampleScans() {
  const now = Date.now();
  const makeItem = (key, confidence, hoursAgo, imageUrl) => {
    const info = DISEASE_DATABASE[key];
    return {
      id: `sample_${key}`,
      diseaseId: info.id,
      crop: info.crop,
      disease: info.disease,
      confidence,
      status: info.status,
      timestamp: new Date(now - hoursAgo * 3600 * 1000).toISOString(),
      imageUrl,
      top3: buildTop3(key, confidence),
      info,
    };
  };

  return [
    makeItem('tomato_early_blight', 92, 3, SAMPLE_LEAF_IMAGES.tomato_early_blight),
    makeItem('potato_late_blight', 89, 28, SAMPLE_LEAF_IMAGES.potato_late_blight),
    makeItem('tomato_healthy', 96, 74, SAMPLE_LEAF_IMAGES.tomato_healthy),
  ];
}
