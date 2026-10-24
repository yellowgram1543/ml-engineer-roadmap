export interface KoreanDialogueLine {
  speaker: string;
  speakerRole: string;
  korean: string;
  english: string;
  notes?: string;
}

export interface KoreanVocabularyEntry {
  id: string;
  korean: string;
  hanja?: string;
  romanization: string;
  partOfSpeech: 'Noun' | 'Verb' | 'Adjective' | 'Expression' | 'Particle' | 'Adverb' | 'Counter';
  english: string;
  exampleKorean: string;
  exampleEnglish: string;
}

export interface KoreanGrammarPoint {
  id: string;
  pattern: string;
  englishMeaning: string;
  formula: string;
  explanation: string;
  rules: string[];
  contrastNotes?: string;
  examples: Array<{
    korean: string;
    english: string;
    breakdown?: string;
  }>;
}

export interface KoreanSpeakingListeningDrill {
  id: string;
  title: string;
  instruction: string;
  drills: Array<{
    prompt: string;
    targetKorean: string;
    english: string;
    audioText: string;
  }>;
}

export interface KoreanReadingWritingTask {
  id: string;
  readingTitle: string;
  readingPassage: string;
  readingTranslation: string;
  comprehensionQuestions: Array<{
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
  }>;
  writingPrompt: string;
  writingTemplate: string;
  sampleAnswer: string;
}

export interface KoreanLesson {
  id: string;
  code: string; // e.g. "1.1", "1.2"
  title: string;
  koreanTitle: string;
  situation: string;
  location: string;
  pragmaticNote: string;
  dialogue: KoreanDialogueLine[];
  vocabulary: KoreanVocabularyEntry[];
  grammar: KoreanGrammarPoint[];
  speakingListening: KoreanSpeakingListeningDrill;
  readingWriting: KoreanReadingWritingTask;
}

export interface KoreanUnit {
  id: string;
  unitNum: number;
  partId: 'A' | 'B' | 'C' | 'D' | '0';
  partName: string;
  title: string;
  koreanTitle: string;
  overview: string;
  lessons: KoreanLesson[];
}

export interface KoreanCheckpoint {
  id: string;
  checkpointCode: 'A' | 'B' | 'C' | 'D';
  title: string;
  prerequisites: string;
  targetSkills: string[];
  targetOutcome?: string;
  spokenSimulation: {
    scenario: string;
    prompt: string;
    sampleKoreanResponse: string;
    english: string;
  };
  writtenTask: {
    prompt: string;
    wordCountTarget: string;
    sampleSubmission: string;
  };
}

export const KOREAN_LEVEL_1_UNITS: KoreanUnit[] = [
  // ─────────────────────────────────────────────────────────────
  // PART 0 — HANGUL FOUNDATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'unit-0',
    unitNum: 0,
    partId: '0',
    partName: 'Hangul Foundations',
    title: 'Hangul: The Alphabet & Sound System',
    koreanTitle: '한글과 발음 기초',
    overview: 'Master basic vowels, consonants, compound letters, and syllable codas (받침) to decouple completely from romanization.',
    lessons: [
      {
        id: 'lesson-0-1',
        code: '0.1',
        title: 'Meeting Korean Letters: Vowels, Consonants & Syllable Blocks',
        koreanTitle: '기본 모음과 기본 자음',
        situation: 'Understanding the featural design of King Sejong\'s alphabet and forming two-letter syllable blocks.',
        location: 'Language Laboratory (언어 실습실)',
        pragmaticNote: 'Hangul letters are never written in a linear row like English (n-a-m-u); they are stacked into syllable blocks representing CV or CVC sounds (나무).',
        dialogue: [
          {
            speaker: '선생님',
            speakerRole: 'Teacher',
            korean: '한글 모음 "ㅏ, ㅓ, ㅗ, ㅜ"를 소리 내어 읽어 보세요.',
            english: 'Try reading the Hangul vowels "a, eo, o, u" aloud.',
            notes: 'Bright vowels (ㅏ, ㅗ) vs Dark vowels (ㅓ, ㅜ).',
          },
          {
            speaker: '학생',
            speakerRole: 'Student',
            korean: 'ㅏ, ㅓ, ㅗ, ㅜ. 자음 "ㄱ, ㄴ, ㄷ"도 같이 읽어요?',
            english: 'a, eo, o, u. Shall we also read consonants "g, n, d" together?',
          },
          {
            speaker: '선생님',
            speakerRole: 'Teacher',
            korean: '네, "가, 나, 다"처럼 모음과 합쳐서 소리를 만듭니다.',
            english: 'Yes, just like "ga, na, da", combine consonants with vowels to create sounds.',
          },
        ],
        vocabulary: [
          {
            id: 'v0-1-1',
            korean: '한글',
            romanization: 'han-geul',
            partOfSpeech: 'Noun',
            english: 'Hangeul (Korean alphabet)',
            exampleKorean: '한글은 읽기 쉬운 글자입니다.',
            exampleEnglish: 'Hangeul is an easy-to-read script.',
          },
          {
            id: 'v0-1-2',
            korean: '모음',
            hanja: '母音',
            romanization: 'mo-eum',
            partOfSpeech: 'Noun',
            english: 'Vowel (literally "mother sound")',
            exampleKorean: '기본 모음은 열 자입니다.',
            exampleEnglish: 'There are ten basic vowels.',
          },
          {
            id: 'v0-1-3',
            korean: '자음',
            hanja: '子音',
            romanization: 'ja-eum',
            partOfSpeech: 'Noun',
            english: 'Consonant (literally "child sound")',
            exampleKorean: '기본 자음은 14자입니다.',
            exampleEnglish: 'There are 14 basic consonants.',
          },
          {
            id: 'v0-1-4',
            korean: '나무',
            romanization: 'na-mu',
            partOfSpeech: 'Noun',
            english: 'Tree / wood',
            exampleKorean: '공원에 큰 나무가 있어요.',
            exampleEnglish: 'There is a big tree in the park.',
          },
          {
            id: 'v0-1-5',
            korean: '아이',
            romanization: 'a-i',
            partOfSpeech: 'Noun',
            english: 'Child / baby',
            exampleKorean: '아이가 활짝 웃어요.',
            exampleEnglish: 'The child smiles brightly.',
          },
        ],
        grammar: [
          {
            id: 'g0-1-1',
            pattern: 'Syllable Block Formation (음절 블록 구조)',
            englishMeaning: 'Combining Initial Consonant (초성) + Medial Vowel (중성)',
            formula: 'Initial Consonant (C) + Medial Vowel (V)',
            explanation: 'Every Korean syllable block MUST begin with a consonant letter. When a syllable begins with a vowel sound, the silent placeholder consonant "ㅇ" must be placed in the initial position (e.g., 아, 오, 우).',
            rules: [
              'Vertical vowels (ㅏ, ㅑ, ㅓ, ㅕ, ㅣ) place the consonant on the left: ㄱ + ㅏ = 가.',
              'Horizontal vowels (ㅗ, ㅛ, ㅜ, ㅠ, ㅡ) place the consonant on top: ㄱ + ㅗ = 고.',
              'Silent "ㅇ" has no sound value at the start of a syllable: ㅇ + ㅣ = 이 (pronounced "ee").',
            ],
            examples: [
              { korean: '가, 나, 다, 라, 마, 바, 사', english: 'ga, na, da, ra, ma, ba, sa' },
              { korean: '고, 노, 도, 로, 모, 보, 소', english: 'go, no, do, ro, mo, bo, so' },
              { korean: '우유, 오이, 모자, 바지', english: 'milk, cucumber, hat, pants' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl0-1',
          title: 'Vowel Discrimination & Syllable Reading',
          instruction: 'Listen carefully to the contrast between bright and dark vowels, then repeat aloud.',
          drills: [
            { prompt: 'Read vowel pair: a vs eo', targetKorean: '아이 / 어디', english: 'child / where', audioText: '아이, 어디' },
            { prompt: 'Read vowel pair: o vs u', targetKorean: '오이 / 우유', english: 'cucumber / milk', audioText: '오이, 우유' },
            { prompt: 'Read consonant contrast: g vs n', targetKorean: '가구 / 나라', english: 'furniture / country', audioText: '가구, 나라' },
          ],
        },
        readingWriting: {
          id: 'rw0-1',
          readingTitle: 'First Korean Syllables',
          readingPassage: '아이. 오이. 나무. 모자. 다리. 비누. 고기.',
          readingTranslation: 'Child. Cucumber. Tree. Hat. Bridge/leg. Soap. Meat.',
          comprehensionQuestions: [
            { question: 'Which word means "tree"?', answer: '나무 (na-mu)', explanation: 'ㄴ + ㅏ = 나, ㅁ + ㅜ = 무.' },
            { question: 'Which word means "cucumber"?', answer: '오이 (o-i)', explanation: 'ㅇ + ㅗ = 오, ㅇ + ㅣ = 이.' },
          ],
          writingPrompt: 'Write the 4 syllable blocks for "cow" (소), "tree" (나무), "water" (물), and "shoes" (구두).',
          writingTemplate: '소, 나무, 물, 구두',
          sampleAnswer: '소, 나무, 물, 구두',
        },
      },
      {
        id: 'lesson-0-2',
        code: '0.2',
        title: 'Aspirated & Tense Consonants & Compound Vowels',
        koreanTitle: '거센소리와 된소리, 이중 모음',
        situation: 'Distinguishing plain, aspirated, and tense sounds that change word meanings in Korean.',
        location: 'Phonetics Sound Studio',
        pragmaticNote: 'Korean does not distinguish voiced/voiceless sounds (B vs P) as phonemes; it distinguishes three-way phonation: Plain (ㄱ), Aspirated (ㅋ - puff of air), and Tense (ㄲ - tight vocal cords).',
        dialogue: [
          {
            speaker: '선생님',
            speakerRole: 'Teacher',
            korean: '"달", "탈", "딸"의 소리 차이를 들어 보세요.',
            english: 'Listen to the sound differences between "dal" (moon), "tal" (mask), and "ttal" (daughter).',
          },
          {
            speaker: '학생',
            speakerRole: 'Student',
            korean: '"탈"은 공기가 많이 나오고, "딸"은 목에 힘이 들어가네요.',
            english: '"Tal" has a lot of air coming out, and "ttal" has tension in the throat.',
          },
          {
            speaker: '선생님',
            speakerRole: 'Teacher',
            korean: '정확해요! 한국어에서는 이 세 소리가 완전히 다른 단어입니다.',
            english: 'Exactly! In Korean, these three sounds create completely different words.',
          },
        ],
        vocabulary: [
          {
            id: 'v0-2-1',
            korean: '달',
            romanization: 'dal',
            partOfSpeech: 'Noun',
            english: 'Moon / month',
            exampleKorean: '밤하늘에 밝은 달이 떴어요.',
            exampleEnglish: 'A bright moon rose in the night sky.',
          },
          {
            id: 'v0-2-2',
            korean: '탈',
            romanization: 'tal',
            partOfSpeech: 'Noun',
            english: 'Mask (traditional)',
            exampleKorean: '전통 하회탈을 썼습니다.',
            exampleEnglish: 'I put on a traditional Hahoe mask.',
          },
          {
            id: 'v0-2-3',
            korean: '딸',
            romanization: 'ttal',
            partOfSpeech: 'Noun',
            english: 'Daughter',
            exampleKorean: '우리 딸은 일곱 살입니다.',
            exampleEnglish: 'Our daughter is seven years old.',
          },
          {
            id: 'v0-2-4',
            korean: '사과',
            romanization: 'sa-gwa',
            partOfSpeech: 'Noun',
            english: 'Apple / apology',
            exampleKorean: '달콤한 사과를 씻었어요.',
            exampleEnglish: 'I washed a sweet apple.',
          },
          {
            id: 'v0-2-5',
            korean: '회사',
            hanja: '會社',
            romanization: 'hoe-sa',
            partOfSpeech: 'Noun',
            english: 'Company / office',
            exampleKorean: '내일 아침에 회사에 갑니다.',
            exampleEnglish: 'I am going to the company tomorrow morning.',
          },
        ],
        grammar: [
          {
            id: 'g0-2-1',
            pattern: 'The 3-Way Consonant Phonation Matrix (평음 · 격음 · 된소리)',
            englishMeaning: 'Plain vs Aspirated vs Tense Consonants',
            formula: 'Plain (ㄱ, ㄷ, ㅂ, ㅅ, ㅈ) ↔ Aspirated (ㅋ, ㅌ, ㅍ, —, ㅊ) ↔ Tense (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ)',
            explanation: 'Placing a hand or sheet of paper in front of your mouth reveals the difference: Plain causes slight air, Aspirated blows the paper vigorously, and Tense emits almost zero air while tensing the glottis.',
            rules: [
              '불 (fire - plain) vs 풀 (grass - aspirated) vs 뿔 (horn - tense).',
              '방 (room - plain) vs 빵 (bread - tense).',
              '자다 (to sleep - plain) vs 차다 (to kick - aspirated) vs 짜다 (to be salty - tense).',
            ],
            examples: [
              { korean: '방 / 빵', english: 'room / bread' },
              { korean: '자다 / 차다 / 짜다', english: 'to sleep / to kick / to be salty' },
              { korean: '가다 / 카드 / 까다', english: 'to go / card / to peel' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl0-2',
          title: '3-Way Phonation Audio Contrast',
          instruction: 'Listen and distinguish plain vs aspirated vs tense consonants.',
          drills: [
            { prompt: 'Distinguish: bang vs ppang', targetKorean: '방 / 빵', english: 'room / bread', audioText: '방, 빵' },
            { prompt: 'Distinguish: dal vs tal vs ttal', targetKorean: '달 / 탈 / 딸', english: 'moon / mask / daughter', audioText: '달, 탈, 딸' },
            { prompt: 'Distinguish: jada vs chada vs jjada', targetKorean: '자다 / 차다 / 짜다', english: 'sleep / kick / salty', audioText: '자다, 차다, 짜다' },
          ],
        },
        readingWriting: {
          id: 'rw0-2',
          readingTitle: 'Consonant Distinctions Passage',
          readingPassage: '아침에 빵을 먹어요. 시원한 차를 마셔요. 날씨가 조금 추워요. 회사에 가요.',
          readingTranslation: 'I eat bread in the morning. I drink cool tea. The weather is a bit cold. I go to the office.',
          comprehensionQuestions: [
            { question: 'What does the speaker eat?', answer: '빵 (bread)', explanation: 'Tense consonant ㅃ in 빵.' },
            { question: 'Where is the speaker going?', answer: '회사 (company/office)', explanation: 'Compound vowel ㅚ in 회.' },
          ],
          writingPrompt: 'Write down the contrasting pairs: "room" (방) and "bread" (빵); "foot" (발) and "arm" (팔).',
          writingTemplate: '방 - 빵 / 발 - 팔',
          sampleAnswer: '방 - 빵 / 발 - 팔',
        },
      },
      {
        id: 'lesson-0-3',
        code: '0.3',
        title: 'Final Consonants (받침) & The 7 Sound-Change Rules',
        koreanTitle: '받침과 7개 대표음, 연음 규칙',
        situation: 'Mastering syllable codas and smooth liaison when reading words in sequence.',
        location: 'Seoul Subway Station Signboards',
        pragmaticNote: 'Although 27 different consonants and double-consonant clusters can be written as 받침, they can only make 7 phonetic sounds at the end of a syllable: [ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ].',
        dialogue: [
          {
            speaker: '안내원',
            speakerRole: 'Subway Attendant',
            korean: '출구 쪽에 "꽃집 [꼳찝]" 간판이 보이세요?',
            english: 'Do you see the "flower shop [kkot-jjip]" sign by the exit?',
            notes: '꽃 [꼳] neutralizes to [ㄷ], causing tensification on 집 [찝].',
          },
          {
            speaker: '승객',
            speakerRole: 'Passenger',
            korean: '네, 보여요! "한국어 [한구거]" 책도 거기서 파나요?',
            english: 'Yes, I see it! Do they also sell "Korean [han-gu-geo]" books there?',
            notes: '한국어 undergoes liaison: ㄱ moves to empty ㅇ space -> [한구거].',
          },
        ],
        vocabulary: [
          {
            id: 'v0-3-1',
            korean: '꽃',
            romanization: 'kkot',
            partOfSpeech: 'Noun',
            english: 'Flower (pronounced [꼳])',
            exampleKorean: '장미꽃 [장미꼳] 이 참 예뻐요.',
            exampleEnglish: 'The rose flower is very pretty.',
          },
          {
            id: 'v0-3-2',
            korean: '한국어',
            hanja: '韓國語',
            romanization: 'han-gu-geo',
            partOfSpeech: 'Noun',
            english: 'Korean language (pronounced [한구거])',
            exampleKorean: '한국어를 열심히 공부해요.',
            exampleEnglish: 'I study Korean diligently.',
          },
          {
            id: 'v0-3-3',
            korean: '감사합니다',
            hanja: '感謝합니다',
            romanization: 'gam-sa-ham-ni-da',
            partOfSpeech: 'Expression',
            english: 'Thank you (pronounced [감사함니다])',
            exampleKorean: '도와주셔서 감사합니다.',
            exampleEnglish: 'Thank you for helping me.',
          },
          {
            id: 'v0-3-4',
            korean: '책',
            hanja: '冊',
            romanization: 'chaek',
            partOfSpeech: 'Noun',
            english: 'Book',
            exampleKorean: '책을 매일 읽어요.',
            exampleEnglish: 'I read books every day.',
          },
          {
            id: 'v0-3-5',
            korean: '지하철',
            hanja: '地下鐵',
            romanization: 'ji-ha-cheol',
            partOfSpeech: 'Noun',
            english: 'Subway (pronounced [지하철])',
            exampleKorean: '지하철을 타고 학교에 가요.',
            exampleEnglish: 'I take the subway to school.',
          },
        ],
        grammar: [
          {
            id: 'g0-3-1',
            pattern: 'Liaison Rule (연음 법칙)',
            englishMeaning: 'Carrying Syllable-Final Consonants into Vowel Placeholders',
            formula: 'Syllable with 받침 + Syllable starting with ㅇ → 받침 sound moves to ㅇ',
            explanation: 'When a syllable with a final consonant is immediately followed by a syllable starting with the silent placeholder consonant "ㅇ", the final consonant naturally leaps over to become the initial sound of the next syllable.',
            rules: [
              '한국어 [한구거]: ㄱ carries over into 어.',
              '음악 [으막]: ㅁ carries over into 악.',
              '집에 [지베]: ㅂ carries over into 에.',
            ],
            examples: [
              { korean: '한국어 → [한구거]', english: 'Korean language' },
              { korean: '음악 → [으막]', english: 'music' },
              { korean: '밥을 먹어요 → [바블 머거요]', english: 'eat rice' },
            ],
          },
          {
            id: 'g0-3-2',
            pattern: 'Syllable-Final Neutralization (음절의 끝소리 규칙)',
            englishMeaning: '7 Representative Coda Sounds',
            formula: 'All codas reduce to: [ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ]',
            explanation: 'In isolation or before a consonant, no matter how complex the written coda is, it collapses into one of the 7 sounds. In particular: ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ all neutralize to phonetic [ㄷ].',
            rules: [
              '옷 [옫] (clothes), 꽃 [꼳] (flower), 낮 [낟] (daytime), 빛 [빋] (light) all end in phonetic [ㄷ].',
              '앞 [압] (front), 잎 [입] (leaf) neutralize to phonetic [ㅂ].',
              '부엌 [부억] (kitchen) neutralizes to phonetic [ㄱ].',
            ],
            examples: [
              { korean: '옷 [옫], 꽃 [꼳], 빛 [빋]', english: 'clothes, flower, light -> all [ㄷ]' },
              { korean: '앞 [압], 숲 [숩]', english: 'front, forest -> all [ㅂ]' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl0-3',
          title: 'Liaison & Batchim Sound Practice',
          instruction: 'Practice moving final consonants into the following vowel smoothly.',
          drills: [
            { prompt: 'Liaison: ba-beul meo-geo-yo', targetKorean: '밥을 먹어요 [바블 머거요]', english: 'eat a meal', audioText: '밥을 먹어요' },
            { prompt: 'Liaison: ha-neul-e', targetKorean: '하늘에 [하느레]', english: 'in the sky', audioText: '하늘에' },
            { prompt: 'Neutralization: kkot-jip', targetKorean: '꽃집 [꼳찝]', english: 'flower shop', audioText: '꽃집' },
          ],
        },
        readingWriting: {
          id: 'rw0-3',
          readingTitle: 'Reading Seoul Subway Signs',
          readingPassage: '서울역 1번 출구입니다. 오른쪽으로 가면 꽃집과 약국이 있습니다. 환승역은 시청역입니다.',
          readingTranslation: 'It is Exit 1 of Seoul Station. If you go right, there is a flower shop and a pharmacy. The transfer station is City Hall Station.',
          comprehensionQuestions: [
            { question: 'How is "꽃집" pronounced?', answer: '[꼳찝]', explanation: '꽃 neutralizes to [ㄷ], triggering tensification [찝].' },
            { question: 'Which exit is mentioned?', answer: '1번 출구 (Exit 1)', explanation: '일 번 출구.' },
          ],
          writingPrompt: 'Transcribe the spoken sounds of: 1) 한국어, 2) 음악, 3) 밥을.',
          writingTemplate: '1) 한국어 → [한구거], 2) 음악 → [으막], 3) 밥을 → [바블]',
          sampleAnswer: '1) [한구거], 2) [으막], 3) [바블]',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PART A — LEARN TO READ AND START SPEAKING
  // ─────────────────────────────────────────────────────────────
  {
    id: 'unit-1',
    unitNum: 1,
    partId: 'A',
    partName: 'Part A — Learn to Read and Start Speaking',
    title: 'Unit 1: Greetings & Self-Introductions',
    koreanTitle: '제1과: 인사와 자기소개',
    overview: 'Learn natural greetings, meeting etiquette, and how to introduce your name, nationality, and profession using 이에요/예요 and 은/는.',
    lessons: [
      {
        id: 'lesson-1-1',
        code: '1.1',
        title: 'Meeting Someone for the First Time: Greetings & Farewells',
        koreanTitle: '처음 만났을 때의 인사',
        situation: 'Meeting a new language exchange partner or acquaintance in Seoul.',
        location: 'Sinchon Cafe (신촌 카페)',
        pragmaticNote: 'In Korean, bowing at approximately 15 to 30 degrees while saying "안녕하세요" conveys genuine respect. Never shake hands with just one hand to an elder or superior; support your right forearm with your left hand.',
        dialogue: [
          {
            speaker: '민수',
            speakerRole: 'Korean Student',
            korean: '안녕하세요! 처음 뵙겠습니다.',
            english: 'Hello! Pleased to meet you for the first time.',
            notes: '처음 뵙겠습니다 is the formal introductory greeting to someone new.',
          },
          {
            speaker: '사라',
            speakerRole: 'Exchange Student',
            korean: '안녕하세요! 만나서 반갑습니다.',
            english: 'Hello! Nice to meet you.',
            notes: '만나서 반갑습니다 is used by both parties after first greetings.',
          },
          {
            speaker: '민수',
            speakerRole: 'Korean Student',
            korean: '오늘 시간 내 주셔서 감사합니다. 안녕히 가세요!',
            english: 'Thank you for making time today. Goodbye (to the person leaving)!',
            notes: '안녕히 가세요 (Go in peace) is said to the person who is departing.',
          },
          {
            speaker: '사라',
            speakerRole: 'Exchange Student',
            korean: '네, 민수 씨도 안녕히 계세요!',
            english: 'Yes, goodbye (stay in peace), Min-su!',
            notes: '안녕히 계세요 (Stay in peace) is said to the person remaining.',
          },
        ],
        vocabulary: [
          {
            id: 'v1-1-1',
            korean: '안녕하세요',
            romanization: 'an-nyeong-ha-se-yo',
            partOfSpeech: 'Expression',
            english: 'Hello / Good morning / How are you?',
            exampleKorean: '선생님, 안녕하세요!',
            exampleEnglish: 'Teacher, hello!',
          },
          {
            id: 'v1-1-2',
            korean: '만나서 반갑습니다',
            romanization: 'man-na-seo ban-gap-seum-ni-da',
            partOfSpeech: 'Expression',
            english: 'Nice to meet you',
            exampleKorean: '처음 뵙겠습니다. 만나서 반갑습니다.',
            exampleEnglish: 'Pleased to make your acquaintance. Nice to meet you.',
          },
          {
            id: 'v1-1-3',
            korean: '안녕히 가세요',
            romanization: 'an-nyeong-hi ga-se-yo',
            partOfSpeech: 'Expression',
            english: 'Goodbye (said to someone who is leaving)',
            exampleKorean: '손님, 안녕히 가세요!',
            exampleEnglish: 'Customer, goodbye!',
          },
          {
            id: 'v1-1-4',
            korean: '안녕히 계세요',
            romanization: 'an-nyeong-hi gye-se-yo',
            partOfSpeech: 'Expression',
            english: 'Goodbye (said to someone who is staying)',
            exampleKorean: '저는 먼저 갈게요. 안녕히 계세요!',
            exampleEnglish: 'I will head out first. Goodbye (stay well)!',
          },
          {
            id: 'v1-1-5',
            korean: '죄송합니다',
            hanja: '罪悚합니다',
            romanization: 'joe-song-ham-ni-da',
            partOfSpeech: 'Expression',
            english: 'I am sorry (polite/formal)',
            exampleKorean: '늦어서 정말 죄송합니다.',
            exampleEnglish: 'I am truly sorry for being late.',
          },
          {
            id: 'v1-1-6',
            korean: '감사합니다',
            hanja: '感謝합니다',
            romanization: 'gam-sa-ham-ni-da',
            partOfSpeech: 'Expression',
            english: 'Thank you (polite/formal)',
            exampleKorean: '도와주셔서 감사합니다.',
            exampleEnglish: 'Thank you for helping me.',
          },
        ],
        grammar: [
          {
            id: 'g1-1-1',
            pattern: '안녕히 가세요 vs 안녕히 계세요',
            englishMeaning: '"Go peacefully" vs "Stay peacefully"',
            formula: '가다 (to go) + -세요 → 가세요 // 계시다 (honorific of to stay) + -세요 → 계세요',
            explanation: 'Korean distinguishes whether the person you are parting with is leaving or staying. If both people are leaving the place, both say "안녕히 가세요!"',
            rules: [
              'The speaker leaves, the other person stays: say 안녕히 계세요.',
              'The speaker stays, the other person leaves: say 안녕히 가세요.',
              'Both people leave: both say 안녕히 가세요.',
            ],
            examples: [
              { korean: '카페를 나갈 때: "안녕히 계세요!"', english: 'When leaving a cafe: "Stay in peace!"' },
              { korean: '집을 나서는 손님에게: "안녕히 가세요!"', english: 'To a guest leaving your house: "Go in peace!"' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl1-1',
          title: 'Greeting & Farewell Repetition',
          instruction: 'Shadow each native speaker line with authentic bowing intonation.',
          drills: [
            { prompt: 'Say hello respectfully', targetKorean: '안녕하세요! 처음 뵙겠습니다.', english: 'Hello! Pleased to meet you.', audioText: '안녕하세요! 처음 뵙겠습니다.' },
            { prompt: 'Say nice to meet you', targetKorean: '만나서 반갑습니다.', english: 'Nice to meet you.', audioText: '만나서 반갑습니다.' },
            { prompt: 'Farewell to person staying', targetKorean: '안녕히 계세요!', english: 'Goodbye (stay in peace)!', audioText: '안녕히 계세요!' },
            { prompt: 'Farewell to person leaving', targetKorean: '안녕히 가세요!', english: 'Goodbye (go in peace)!', audioText: '안녕히 가세요!' },
          ],
        },
        readingWriting: {
          id: 'rw1-1',
          readingTitle: 'First Day Greetings at the Institute',
          readingPassage: '안녕하세요. 처음 뵙겠습니다. 저는 민수입니다. 만나서 반갑습니다. 안녕히 계세요.',
          readingTranslation: 'Hello. Pleased to meet you for the first time. I am Min-su. Nice to meet you. Goodbye.',
          comprehensionQuestions: [
            { question: 'What is the speaker\'s name?', answer: '민수 (Min-su)', explanation: '저는 민수입니다.' },
            { question: 'Is the speaker staying or leaving at the end?', answer: 'Leaving', explanation: 'He says "안녕히 계세요" to the people staying.' },
          ],
          writingPrompt: 'Write a short 3-sentence greeting introducing yourself to a new acquaintance.',
          writingTemplate: '1. 안녕하세요!\n2. 만나서 반갑습니다.\n3. 감사합니다.',
          sampleAnswer: '안녕하세요! 저는 마이클입니다. 만나서 반갑습니다.',
        },
      },
      {
        id: 'lesson-1-2',
        code: '1.2',
        title: 'Introducing Yourself: Names, Nationalities & Occupations',
        koreanTitle: '자기소개: 국적과 직업 말하기',
        situation: 'First day of Korean language class at Seoul National University.',
        location: 'SNU Language Education Institute Classroom (서울대 언어교육원)',
        pragmaticNote: 'The title "씨" (e.g. 민수 씨, 사라 씨) is polite and respectful between peers and adult classmates. Never attach "씨" to your own name (e.g., saying "저는 사라 씨예요" is incorrect; say "저는 사라예요").',
        dialogue: [
          {
            speaker: '사라',
            speakerRole: 'Student A',
            korean: '안녕하세요? 저는 사라예요. 미국 사람이에요.',
            english: 'Hello? I am Sarah. I am American.',
            notes: '사라 ends in a vowel, so it takes 예요. 사람 ends in a consonant, so it takes 이에요.',
          },
          {
            speaker: '민수',
            speakerRole: 'Student B',
            korean: '반가워요, 사라 씨! 저는 김민수예요. 한국 사람이에요.',
            english: 'Nice to meet you, Sarah! I am Kim Min-su. I am Korean.',
          },
          {
            speaker: '사라',
            speakerRole: 'Student A',
            korean: '민수 씨는 학생이에요?',
            english: 'Are you a student, Min-su?',
          },
          {
            speaker: '민수',
            speakerRole: 'Student B',
            korean: '네, 저는 대학생이에요. 사라 씨는 회사원이에요?',
            english: 'Yes, I am a university student. Are you an office worker, Sarah?',
          },
          {
            speaker: '사라',
            speakerRole: 'Student A',
            korean: '아니요, 저도 학생이에요.',
            english: 'No, I am also a student.',
            notes: '도 means "also/too", replacing the topic particle 은/는.',
          },
        ],
        vocabulary: [
          {
            id: 'v1-2-1',
            korean: '사람',
            romanization: 'sa-ram',
            partOfSpeech: 'Noun',
            english: 'Person / people',
            exampleKorean: '저는 미국 사람이에요.',
            exampleEnglish: 'I am an American person.',
          },
          {
            id: 'v1-2-2',
            korean: '한국',
            hanja: '韓國',
            romanization: 'han-guk',
            partOfSpeech: 'Noun',
            english: 'Korea',
            exampleKorean: '한국에 여행을 왔어요.',
            exampleEnglish: 'I came on a trip to Korea.',
          },
          {
            id: 'v1-2-3',
            korean: '미국',
            hanja: '美國',
            romanization: 'mi-guk',
            partOfSpeech: 'Noun',
            english: 'United States of America',
            exampleKorean: '미국 뉴욕에서 살았어요.',
            exampleEnglish: 'I lived in New York, USA.',
          },
          {
            id: 'v1-2-4',
            korean: '학생',
            hanja: '學生',
            romanization: 'hak-saeng',
            partOfSpeech: 'Noun',
            english: 'Student',
            exampleKorean: '저는 한국어 학생이에요.',
            exampleEnglish: 'I am a Korean language student.',
          },
          {
            id: 'v1-2-5',
            korean: '선생님',
            hanja: '先生님',
            romanization: 'seon-saeng-nim',
            partOfSpeech: 'Noun',
            english: 'Teacher (honorific)',
            exampleKorean: '선생님, 질문이 있습니다.',
            exampleEnglish: 'Teacher, I have a question.',
          },
          {
            id: 'v1-2-6',
            korean: '회사원',
            hanja: '會社員',
            romanization: 'hoe-sa-won',
            partOfSpeech: 'Noun',
            english: 'Office worker / company employee',
            exampleKorean: '제 친구는 회사원이에요.',
            exampleEnglish: 'My friend is an office worker.',
          },
          {
            id: 'v1-2-7',
            korean: '의사',
            hanja: '醫師',
            romanization: 'ui-sa',
            partOfSpeech: 'Noun',
            english: 'Doctor / physician',
            exampleKorean: '병원에 의사 선생님이 계세요.',
            exampleEnglish: 'The doctor is at the clinic.',
          },
        ],
        grammar: [
          {
            id: 'g1-2-1',
            pattern: 'Noun + 이에요 / 예요',
            englishMeaning: 'Am / Is / Are (Polite Identification Copula)',
            formula: 'Noun ending in Consonant + 이에요 // Noun ending in Vowel + 예요',
            explanation: 'The identification copula equates the subject to a noun ("A is B"). In spoken Korean (해요체), the form depends entirely on whether the preceding noun ends with a consonant (받침) or a vowel.',
            rules: [
              'Ends in Consonant (받침 O): 학생 + 이에요 → 학생이에요.',
              'Ends in Vowel (받침 X): 의사 + 예요 → 의사예요.',
              'Question form has the exact same spelling with rising intonation: 학생이에요? (Are you a student?)',
            ],
            examples: [
              { korean: '저는 학생이에요.', english: 'I am a student.' },
              { korean: '저는 의사예요.', english: 'I am a doctor.' },
              { korean: '한국 사람이에요?', english: 'Are you Korean?' },
            ],
          },
          {
            id: 'g1-2-2',
            pattern: 'Topic Particle: Noun + 은 / 는',
            englishMeaning: '"As for N..." / Topic Marker',
            formula: 'Noun ending in Consonant + 은 // Noun ending in Vowel + 는',
            explanation: 'Marks the topic of the sentence ("As for me...", "Speaking of Min-su..."). It sets the stage or creates a contrast with other topics.',
            rules: [
              'Ends in Consonant: 사람 + 은 → 사람은.',
              'Ends in Vowel: 저 + 는 → 저는.',
            ],
            examples: [
              { korean: '저는 사라예요.', english: 'As for me, I am Sarah.' },
              { korean: '민수 씨는 학생이에요.', english: 'As for Min-su, he is a student.' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl1-2',
          title: 'Identity & Nationality Substitution Drills',
          instruction: 'Substitute nationalities and professions into the pattern "저는 [Country] 사람이에요".',
          drills: [
            { prompt: 'Say: I am American', targetKorean: '저는 미국 사람이에요.', english: 'I am American.', audioText: '저는 미국 사람이에요.' },
            { prompt: 'Say: I am Japanese', targetKorean: '저는 일본 사람이에요.', english: 'I am Japanese.', audioText: '저는 일본 사람이에요.' },
            { prompt: 'Say: I am an office worker', targetKorean: '저는 회사원이에요.', english: 'I am an office worker.', audioText: '저는 회사원이에요.' },
            { prompt: 'Ask: Are you a teacher?', targetKorean: '선생님이에요?', english: 'Are you a teacher?', audioText: '선생님이에요?' },
          ],
        },
        readingWriting: {
          id: 'rw1-2',
          readingTitle: 'Classmate Self-Introduction Card',
          readingPassage: '안녕하세요? 제 이름은 타쿠야예요. 저는 일본 사람이에요. 저는 서울대학교 학생이에요. 반갑습니다.',
          readingTranslation: 'Hello? My name is Takuya. I am Japanese. I am a Seoul National University student. Nice to meet you.',
          comprehensionQuestions: [
            { question: 'Where is Takuya from?', answer: '일본 (Japan)', explanation: '저는 일본 사람이에요.' },
            { question: 'What is his occupation?', answer: '대학생 (University student)', explanation: '서울대학교 학생이에요.' },
          ],
          writingPrompt: 'Write your own 4-sentence Korean self-introduction using: greeting, name, nationality, and occupation.',
          writingTemplate: '1. 안녕하세요?\n2. 저는 [이름]이에요/예요.\n3. 저는 [나라] 사람이에요.\n4. 저는 [직업]이에요/예요. 반갑습니다!',
          sampleAnswer: '안녕하세요? 저는 안나예요. 저는 독일 사람이에요. 저는 회사원이에요. 반갑습니다!',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 2 — CLASSROOM KOREAN & OBJECTS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'unit-2',
    unitNum: 2,
    partId: 'A',
    partName: 'Part A — Learn to Read and Start Speaking',
    title: 'Unit 2: Classroom Korean & Everyday Objects',
    koreanTitle: '제2과: 교실 한국어와 사물',
    overview: 'Master classroom requests, demonstratives (이거/그거/저거), identifying objects, and negating nouns with 아니에요.',
    lessons: [
      {
        id: 'lesson-2-1',
        code: '2.1',
        title: 'Classroom Survival: Asking the Teacher for Help',
        koreanTitle: '선생님, 질문 있어요!',
        situation: 'Asking for clarification and instructions during Korean language class.',
        location: 'Classroom Room 204 (204호 강의실)',
        pragmaticNote: 'When you do not understand something in class, saying "다시 말씀해 주세요" (Please say it again) is polite and expected. Saying just "뭐요?" is considered blunt and rude to an instructor.',
        dialogue: [
          {
            speaker: '선생님',
            speakerRole: 'Teacher',
            korean: '책 15쪽을 펴세요. 다 읽으셨어요?',
            english: 'Please open your books to page 15. Have you all read it?',
          },
          {
            speaker: '학생',
            speakerRole: 'Student',
            korean: '선생님, 질문 있어요! 잘 모르겠어요.',
            english: 'Teacher, I have a question! I don\'t understand well.',
            notes: '질문 있어요 (I have a question) + 잘 모르겠어요 (I don\'t know/understand well).',
          },
          {
            speaker: '선생님',
            speakerRole: 'Teacher',
            korean: '네, 어떤 단어를 모르겠어요?',
            english: 'Yes, which word do you not understand?',
          },
          {
            speaker: '학생',
            speakerRole: 'Student',
            korean: '천천히 다시 말씀해 주세요.',
            english: 'Please say it again slowly.',
            notes: '천천히 (slowly) + 다시 (again) + 말씀해 주세요 (please speak honorifically).',
          },
        ],
        vocabulary: [
          {
            id: 'v2-1-1',
            korean: '질문',
            hanja: '質問',
            romanization: 'jil-mun',
            partOfSpeech: 'Noun',
            english: 'Question',
            exampleKorean: '질문이 있으면 손을 드세요.',
            exampleEnglish: 'If you have a question, please raise your hand.',
          },
          {
            id: 'v2-1-2',
            korean: '책',
            hanja: '冊',
            romanization: 'chaek',
            partOfSpeech: 'Noun',
            english: 'Book',
            exampleKorean: '책을 펴세요.',
            exampleEnglish: 'Please open your book.',
          },
          {
            id: 'v2-1-3',
            korean: '천천히',
            romanization: 'cheon-cheon-hi',
            partOfSpeech: 'Adverb',
            english: 'Slowly',
            exampleKorean: '천천히 읽어 주세요.',
            exampleEnglish: 'Please read slowly.',
          },
          {
            id: 'v2-1-4',
            korean: '다시',
            romanization: 'da-si',
            partOfSpeech: 'Adverb',
            english: 'Again / once more',
            exampleKorean: '다시 한번 들어 보세요.',
            exampleEnglish: 'Please listen once more.',
          },
          {
            id: 'v2-1-5',
            korean: '공책',
            hanja: '空冊',
            romanization: 'gong-chaek',
            partOfSpeech: 'Noun',
            english: 'Notebook',
            exampleKorean: '공책에 필기하세요.',
            exampleEnglish: 'Please take notes in your notebook.',
          },
        ],
        grammar: [
          {
            id: 'g2-1-1',
            pattern: 'Verb Stem + -(으)세요 (Polite Request)',
            englishMeaning: 'Please do [Action] / Imperative Request',
            formula: 'Consonant stem + 으세요 // Vowel stem + 세요',
            explanation: 'Used by teachers and elders to give polite directions or instructions. Common classroom verbs: 읽다 → 읽으세요 (please read), 보다 → 보세요 (please look).',
            rules: [
              '닫다 (to close) → 닫으세요.',
              '쓰다 (to write) → 쓰세요.',
              '듣다 (to listen - ㄷ irregular) → 들으세요.',
            ],
            examples: [
              { korean: '책을 보세요.', english: 'Please look at the book.' },
              { korean: '따라 읽으세요.', english: 'Please read along.' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl2-1',
          title: 'Classroom Requests Drills',
          instruction: 'Practice requesting help from the teacher clearly.',
          drills: [
            { prompt: 'Request: Please speak slowly', targetKorean: '천천히 말씀해 주세요.', english: 'Please speak slowly.', audioText: '천천히 말씀해 주세요.' },
            { prompt: 'Request: Please say it once more', targetKorean: '다시 한번 말씀해 주세요.', english: 'Please say it once again.', audioText: '다시 한번 말씀해 주세요.' },
            { prompt: 'Statement: I have a question', targetKorean: '선생님, 질문 있어요!', english: 'Teacher, I have a question!', audioText: '선생님, 질문 있어요!' },
          ],
        },
        readingWriting: {
          id: 'rw2-1',
          readingTitle: 'Classroom Instruction Board',
          readingPassage: '여러분, 교재를 펴세요. 오디오를 들으세요. 그리고 공책에 정답을 쓰세요. 질문이 있으면 손을 드세요.',
          readingTranslation: 'Everyone, please open your textbooks. Listen to the audio. And write the correct answers in your notebook. If you have questions, please raise your hand.',
          comprehensionQuestions: [
            { question: 'Where should students write answers?', answer: '공책에 (in notebook)', explanation: '공책에 정답을 쓰세요.' },
            { question: 'What should you do if you have a question?', answer: '손을 들다 (raise hand)', explanation: '손을 드세요.' },
          ],
          writingPrompt: 'Write 3 polite requests you would say to your Korean teacher in class.',
          writingTemplate: '1. 질문 있어요.\n2. 다시 말씀해 주세요.\n3. 천천히 말씀해 주세요.',
          sampleAnswer: '선생님, 질문 있어요. 천천히 말씀해 주세요. 감사합니다.',
        },
      },
      {
        id: 'lesson-2-2',
        code: '2.2',
        title: 'Asking What an Object Is: Demonstratives & Negation',
        koreanTitle: '이거, 그거, 저거와 사물 이름',
        situation: 'Asking about unfamiliar items in a stationery shop or on a desk.',
        location: 'Kyobo Bookstore Stationery Section (교보문고 문구 코너)',
        pragmaticNote: '이거 (this near speaker), 그거 (that near listener), 저거 (that over there far from both). When spoken casually, 이것/그것/저것 contracted to 이거/그거/저거.',
        dialogue: [
          {
            speaker: '지우',
            speakerRole: 'Shopper A',
            korean: '민호 씨, 저게 뭐예요?',
            english: 'Min-ho, what is that over there?',
            notes: '저것이 contracted to 저게 in natural speech.',
          },
          {
            speaker: '민호',
            speakerRole: 'Shopper B',
            korean: '저거요? 저거는 전자사전이에요.',
            english: 'That over there? That is an electronic dictionary.',
          },
          {
            speaker: '지우',
            speakerRole: 'Shopper A',
            korean: '아, 스마트폰이 아니에요?',
            english: 'Ah, is it not a smartphone?',
            notes: '아니에요 is the negative copula ("is not").',
          },
          {
            speaker: '민호',
            speakerRole: 'Shopper B',
            korean: '네, 스마트폰이 아니에요. 사전이에요.',
            english: 'Yes, it is not a smartphone. It is a dictionary.',
          },
        ],
        vocabulary: [
          {
            id: 'v2-2-1',
            korean: '이거',
            romanization: 'i-geo',
            partOfSpeech: 'Noun',
            english: 'This item (near speaker)',
            exampleKorean: '이거 얼마예요?',
            exampleEnglish: 'How much is this?',
          },
          {
            id: 'v2-2-2',
            korean: '그거',
            romanization: 'geu-geo',
            partOfSpeech: 'Noun',
            english: 'That item (near listener)',
            exampleKorean: '그거 보여 주세요.',
            exampleEnglish: 'Please show me that.',
          },
          {
            id: 'v2-2-3',
            korean: '저거',
            romanization: 'jeo-geo',
            partOfSpeech: 'Noun',
            english: 'That item over there (far from both)',
            exampleKorean: '저거 참 예쁘네요.',
            exampleEnglish: 'That over there is really pretty.',
          },
          {
            id: 'v2-2-4',
            korean: '시계',
            hanja: '時計',
            romanization: 'si-gye',
            partOfSpeech: 'Noun',
            english: 'Clock / watch',
            exampleKorean: '벽에 시계가 있어요.',
            exampleEnglish: 'There is a clock on the wall.',
          },
          {
            id: 'v2-2-5',
            korean: '가방',
            romanization: 'ga-bang',
            partOfSpeech: 'Noun',
            english: 'Bag / backpack',
            exampleKorean: '가방이 아주 무거워요.',
            exampleEnglish: 'The bag is very heavy.',
          },
          {
            id: 'v2-2-6',
            korean: '지갑',
            hanja: '紙匣',
            romanization: 'ji-gap',
            partOfSpeech: 'Noun',
            english: 'Wallet / purse',
            exampleKorean: '지갑에 현금이 없어요.',
            exampleEnglish: 'There is no cash in my wallet.',
          },
        ],
        grammar: [
          {
            id: 'g2-2-1',
            pattern: 'Demonstratives: 이거 / 그거 / 저거',
            englishMeaning: 'This / That (near you) / That (over there)',
            formula: '이거 (near speaker) // 그거 (near listener) // 저거 (distant from both)',
            explanation: 'Refers to physical objects based on proximity to the speaker and listener. When attached to nouns as modifiers, use 이 [Noun], 그 [Noun], 저 [Noun] (e.g., 이 책, 그 가방, 저 건물).',
            rules: [
              '이것이 → 이게 (Subject).',
              '이것은 → 이건 (Topic).',
              '이것을 → 이걸 (Object).',
            ],
            examples: [
              { korean: '이게 뭐예요? — 시계예요.', english: 'What is this? — It is a watch.' },
              { korean: '그건 제 가방이에요.', english: 'That is my bag.' },
              { korean: '저 시계가 비싸요.', english: 'That watch over there is expensive.' },
            ],
          },
          {
            id: 'g2-2-2',
            pattern: 'Noun Negation: Noun + 이/가 아니에요',
            englishMeaning: 'Am not / Is not / Are not Noun',
            formula: 'Consonant noun + 이 아니에요 // Vowel noun + 가 아니에요',
            explanation: 'The negative counterpart of 이에요/예요. Always requires the subject particle 이 or 가 attached to the preceding noun.',
            rules: [
              '학생 (consonant) + 이 아니에요 → 학생이 아니에요 (I am not a student).',
              '의사 (vowel) + 가 아니에요 → 의사가 아니에요 (I am not a doctor).',
            ],
            examples: [
              { korean: '저는 일본 사람이 아니에요.', english: 'I am not Japanese.' },
              { korean: '이건 제 지갑이 아니에요.', english: 'This is not my wallet.' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl2-2',
          title: 'Demonstrative & Negation Dialogue',
          instruction: 'Ask what an object is and deny incorrect guesses.',
          drills: [
            { prompt: 'Ask: What is this?', targetKorean: '이게 뭐예요?', english: 'What is this?', audioText: '이게 뭐예요?' },
            { prompt: 'Answer: It is a wallet', targetKorean: '지갑이에요.', english: 'It is a wallet.', audioText: '지갑이에요.' },
            { prompt: 'Deny: It is not a smartphone', targetKorean: '스마트폰이 아니에요.', english: 'It is not a smartphone.', audioText: '스마트폰이 아니에요.' },
          ],
        },
        readingWriting: {
          id: 'rw2-2',
          readingTitle: 'Desk Inspection Note',
          readingPassage: '책상 위에 물건이 많아요. 이건 한국어 책이에요. 공책이 아니에요. 저건 제 스마트폰이에요. 지갑은 가방 안에 있어요.',
          readingTranslation: 'There are many items on the desk. This is a Korean book. It is not a notebook. That over there is my smartphone. The wallet is inside the bag.',
          comprehensionQuestions: [
            { question: 'Is the item on the desk a notebook?', answer: 'No', explanation: '공책이 아니에요 (It is not a notebook).' },
            { question: 'Where is the wallet?', answer: '가방 안에 (inside the bag)', explanation: '가방 안에 있어요.' },
          ],
          writingPrompt: 'Write 3 sentences identifying 3 objects on your desk and negating what they are not.',
          writingTemplate: '1. 이건 [사물 1]이에요/예요.\n2. [사물 2]이/가 아니에요.\n3. 저건 [사물 3]이에요/예요.',
          sampleAnswer: '이건 제 노트북이에요. 태블릿이 아니에요. 저건 제 텀블러예요.',
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // UNIT 3 — PEOPLE & BELONGINGS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'unit-3',
    unitNum: 3,
    partId: 'A',
    partName: 'Part A — Learn to Read and Start Speaking',
    title: 'Unit 3: People & Belongings',
    koreanTitle: '제3과: 사람과 물건 (소유)',
    overview: 'Learn possessive particle 의, existence verb 있어요/없어요, and describing what someone has.',
    lessons: [
      {
        id: 'lesson-3-1',
        code: '3.1',
        title: 'Asking About a Friend\'s Bag: Possession (의)',
        koreanTitle: '이 가방 누구 거예요?',
        situation: 'Finding a lost bag in a study lounge and locating the owner.',
        location: 'University Study Lounge (대학 휴게실)',
        pragmaticNote: 'The possessive particle "의" is pronounced [에] in spoken conversational Korean (e.g. 민수의 is pronounced [민수에]). In everyday speech, "의 것" (thing of...) contracts to "거" (누구 거예요? = Whose is it?).',
        dialogue: [
          {
            speaker: '유진',
            speakerRole: 'Student A',
            korean: '민수 씨, 이 검은색 가방 민수 씨 거예요?',
            english: 'Min-su, is this black bag yours?',
            notes: '민수 씨 거예요? = Is it Min-su\'s?',
          },
          {
            speaker: '민수',
            speakerRole: 'Student B',
            korean: '아니요, 제 가방이 아니에요. 제 가방은 파란색이에요.',
            english: 'No, it is not my bag. My bag is blue.',
            notes: '저의 (my) contracts to 제. 나 + 의 contracts to 내.',
          },
          {
            speaker: '유진',
            speakerRole: 'Student A',
            korean: '그럼 이 가방은 누구 거예요?',
            english: 'Then whose bag is this?',
          },
          {
            speaker: '민수',
            speakerRole: 'Student B',
            korean: '마이클 씨의 가방이에요. 아까 찾고 있었어요.',
            english: 'It is Michael\'s bag. He was looking for it earlier.',
          },
        ],
        vocabulary: [
          {
            id: 'v3-1-1',
            korean: '누구',
            romanization: 'nu-gu',
            partOfSpeech: 'Noun',
            english: 'Who / whose',
            exampleKorean: '저 사람은 누구예요?',
            exampleEnglish: 'Who is that person over there?',
          },
          {
            id: 'v3-1-2',
            korean: '제',
            romanization: 'je',
            partOfSpeech: 'Noun',
            english: 'My (polite, contracted from 저의)',
            exampleKorean: '이건 제 책이에요.',
            exampleEnglish: 'This is my book.',
          },
          {
            id: 'v3-1-3',
            korean: '내',
            romanization: 'nae',
            partOfSpeech: 'Noun',
            english: 'My (casual, contracted from 나의)',
            exampleKorean: '내 우산 어디 있어?',
            exampleEnglish: 'Where is my umbrella?',
          },
          {
            id: 'v3-1-4',
            korean: '우산',
            hanja: '雨傘',
            romanization: 'u-san',
            partOfSpeech: 'Noun',
            english: 'Umbrella',
            exampleKorean: '비가 오니까 우산을 챙기세요.',
            exampleEnglish: 'Since it is raining, take an umbrella.',
          },
          {
            id: 'v3-1-5',
            korean: '모자',
            hanja: '帽子',
            romanization: 'mo-ja',
            partOfSpeech: 'Noun',
            english: 'Hat / cap',
            exampleKorean: '이 모자 정말 멋져요.',
            exampleEnglish: 'This hat is really cool.',
          },
        ],
        grammar: [
          {
            id: 'g3-1-1',
            pattern: 'Possessive Particle: Noun + 의',
            englishMeaning: '"Of" / Possessive \'s',
            formula: 'Noun + 의 (pronounced [에] in speech)',
            explanation: 'Attaches to a noun to show ownership. Common contractions: 저의 → 제 (my, polite), 나의 → 내 (my, casual), 너의 → 네 / 네 [pronounced 니] (your).',
            rules: [
              '선생님의 책 [선생니메 책] = Teacher\'s book.',
              '누구의 것 → 누구 거 = Whose item.',
              '제 우산 = My umbrella.',
            ],
            examples: [
              { korean: '이건 제 친구의 가방이에요.', english: 'This is my friend\'s bag.' },
              { korean: '누구 거역시요? — 제 거예요.', english: 'Whose is it? — It is mine.' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl3-1',
          title: 'Possession & Whose Item Drills',
          instruction: 'Practice claiming and identifying who items belong to.',
          drills: [
            { prompt: 'Ask: Whose watch is this?', targetKorean: '이 시계 누구 거예요?', english: 'Whose watch is this?', audioText: '이 시계 누구 거예요?' },
            { prompt: 'Answer: It is my watch', targetKorean: '제 시계예요.', english: 'It is my watch.', audioText: '제 시계예요.' },
            { prompt: 'State: It is Min-su\'s umbrella', targetKorean: '민수 씨 우산이에요.', english: 'It is Min-su\'s umbrella.', audioText: '민수 씨 우산이에요.' },
          ],
        },
        readingWriting: {
          id: 'rw3-1',
          readingTitle: 'Lost & Found Notice',
          readingPassage: '휴게실에 검은색 가방이 있습니다. 이 가방은 선생님의 가방이 아닙니다. 마이클 씨의 가방입니다. 3층 교무실로 오세요.',
          readingTranslation: 'There is a black bag in the lounge. This bag is not the teacher\'s bag. It is Michael\'s bag. Please come to the 3rd floor teachers\' office.',
          comprehensionQuestions: [
            { question: 'Whose bag is it?', answer: '마이클 씨 (Michael)', explanation: '마이클 씨의 가방입니다.' },
            { question: 'Where should he pick it up?', answer: '3층 교무실 (3rd floor teachers\' office)', explanation: '3층 교무실로 오세요.' },
          ],
          writingPrompt: 'Write 3 sentences describing 3 items you have and who they belong to.',
          writingTemplate: '1. 이건 제 [물건 1]이에요.\n2. 저건 제 친구의 [물건 2]예요.\n3. 이건 누구 거역시요?',
          sampleAnswer: '이건 제 스마트폰이에요. 저건 제 룸메이트의 우산이에요. 이 열쇠는 누구 거예요?',
        },
      },
      {
        id: 'lesson-3-2',
        code: '3.2',
        title: 'Asking What Someone Has: 있어요 and 없어요',
        koreanTitle: '펜 있어요? — 있어요와 없어요',
        situation: 'Borrowing stationery and asking if a classmate has something.',
        location: 'SNU Central Library Study Room (서울대 중앙도서관)',
        pragmaticNote: '있어요 means both "to exist / be located" AND "to possess / have".없어요 is its single negative counterpart ("does not exist" or "do not have"). Korean does not use "안 있어요".',
        dialogue: [
          {
            speaker: '지민',
            speakerRole: 'Student A',
            korean: '유진 씨, 혹시 파란색 펜 있어요?',
            english: 'Yu-jin, by any chance do you have a blue pen?',
            notes: '혹시 (by any chance) + 펜 있어요? (Do you have a pen?)',
          },
          {
            speaker: '유진',
            speakerRole: 'Student B',
            korean: '네, 필통에 펜 있어요. 여기 있어요.',
            english: 'Yes, I have a pen in my pencil case. Here it is.',
          },
          {
            speaker: '지민',
            speakerRole: 'Student A',
            korean: '지우개도 있어요?',
            english: 'Do you have an eraser too?',
          },
          {
            speaker: '유진',
            speakerRole: 'Student B',
            korean: '아니요, 지우개는 없어요. 연필만 있어요.',
            english: 'No, I don\'t have an eraser. I only have a pencil.',
            notes: '만 means "only", attached directly to the noun.',
          },
        ],
        vocabulary: [
          {
            id: 'v3-2-1',
            korean: '있다',
            romanization: 'it-da',
            partOfSpeech: 'Verb',
            english: 'To have / to exist (polite: 있어요)',
            exampleKorean: '저는 지금 시간이 있어요.',
            exampleEnglish: 'I have time right now.',
          },
          {
            id: 'v3-2-2',
            korean: '없다',
            romanization: 'eop-da',
            partOfSpeech: 'Verb',
            english: 'To not have / to not exist (polite: 없어요)',
            exampleKorean: '지갑에 돈이 없어요.',
            exampleEnglish: 'I have no money in my wallet.',
          },
          {
            id: 'v3-2-3',
            korean: '펜',
            romanization: 'pen',
            partOfSpeech: 'Noun',
            english: 'Pen',
            exampleKorean: '펜으로 이름을 쓰세요.',
            exampleEnglish: 'Please write your name with a pen.',
          },
          {
            id: 'v3-2-4',
            korean: '지우개',
            romanization: 'ji-u-gae',
            partOfSpeech: 'Noun',
            english: 'Eraser',
            exampleKorean: '지우개로 글씨를 지웠어요.',
            exampleEnglish: 'I erased the writing with an eraser.',
          },
          {
            id: 'v3-2-5',
            korean: '돈',
            romanization: 'don',
            partOfSpeech: 'Noun',
            english: 'Money',
            exampleKorean: '교통카드를 살 돈이 있어요.',
            exampleEnglish: 'I have money to buy a transit card.',
          },
        ],
        grammar: [
          {
            id: 'g3-2-1',
            pattern: 'Noun + 이/가 있어요 / 없어요 (Possession)',
            englishMeaning: 'To have / To not have Noun',
            formula: 'Consonant noun + 이 있어요 // Vowel noun + 가 있어요',
            explanation: 'Expresses possession. Notice that Korean puts the subject particle 이/가 on the item you have, unlike English where the item is a direct object.',
            rules: [
              '시간이 있어요 = I have time.',
              '친구가 없어요 = I don\'t have friends.',
              'Never say "안 있어요" — the opposite of 있어요 is always 없어요.',
            ],
            examples: [
              { korean: '우산이 있어요?', english: 'Do you have an umbrella?' },
              { korean: '네, 있어요. / 아니요, 없어요.', english: 'Yes, I have it. / No, I don\'t.' },
            ],
          },
        ],
        speakingListening: {
          id: 'sl3-2',
          title: 'Having vs Not Having Drills',
          instruction: 'Ask and answer about items in your bag using 있어요 / 없어요.',
          drills: [
            { prompt: 'Ask: Do you have money?', targetKorean: '돈이 있어요?', english: 'Do you have money?', audioText: '돈이 있어요?' },
            { prompt: 'Answer: No, I don\'t have money', targetKorean: '아니요, 돈이 없어요.', english: 'No, I don\'t have money.', audioText: '아니요, 돈이 없어요.' },
            { prompt: 'Ask: Do you have time today?', targetKorean: '오늘 시간 있어요?', english: 'Do you have time today?', audioText: '오늘 시간 있어요?' },
          ],
        },
        readingWriting: {
          id: 'rw3-2',
          readingTitle: 'What is Inside Sarah\'s Backpack?',
          readingPassage: '제 가방 안에 책과 공책이 있어요. 필통도 있어요. 필통 안에 볼펜이 있어요. 하지만 지우개는 없어요. 스마트폰도 가방에 있어요.',
          readingTranslation: 'Inside my bag there are books and notebooks. There is also a pencil case. Inside the pencil case there is a ballpoint pen. However, there is no eraser. My smartphone is also in the bag.',
          comprehensionQuestions: [
            { question: 'What is inside the pencil case?', answer: '볼펜 (ballpoint pen)', explanation: '필통 안에 볼펜이 있어요.' },
            { question: 'Does Sarah have an eraser?', answer: 'No', explanation: '지우개는 없어요.' },
          ],
          writingPrompt: 'Write 4 sentences describing what you have and do not have in your bag right now.',
          writingTemplate: '1. 제 가방에 [물건 1]이/가 있어요.\n2. [물건 2]도 있어요.\n3. 하지만 [물건 3]은/는 없어요.\n4. [물건 4]도 없어요.',
          sampleAnswer: '제 가방에 지갑이 있어요. 이어폰도 있어요. 하지만 우산은 없어요. 현금도 없어요.',
        },
      },
    ],
  },
// ==========================================
// PART B: HANDLE EVERYDAY NEEDS (UNITS 4-8)
// ==========================================
...([
  {
    "id": "unit-4",
    "unitNum": 4,
    "partId": "B",
    "partName": "Part B: Everyday Needs",
    "title": "Places and Locations",
    "koreanTitle": "장소와 위치",
    "overview": "Explain where objects or places are located using location particles, existence verbs, and positional prepositions (앞, 뒤, 옆, 안, 밖, 위, 밑).",
    "lessons": [
      {
        "id": "lesson-4-1",
        "code": "4.1",
        "title": "Finding an Object in a Room",
        "koreanTitle": "방에서 물건 찾기",
        "situation": "Describe the location of household and classroom objects using location marker 에 and 있어요/없어요.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korean homes and student dormitories (기숙사), asking where shared or personal study materials are located is everyday conversation. When indicating positions, Korean places the reference noun before the position noun: [Noun] + [위/밑/앞/뒤/옆] + 에 있어요 (e.g. 책상 위에 있어요, literally \"desk top-at is\").",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "민수 씨, 제 한국어 책이 어디에 있어요?",
            "english": "Min-su, where is my Korean book?",
            "notes": "어디에 = \"at where\" (어디 + 에 location marker)."
          },
          {
            "speaker": "Minsu (민수)",
            "speakerRole": "Korean university student",
            "korean": "책상 위에 있어요. 안경도 책상 위에 있어요.",
            "english": "It is on the desk. The glasses are also on the desk.",
            "notes": "책상 위 = desk top; 위 = above/on."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "아, 찾았어요! 그러면 제 가방은 어디에 있어요?",
            "english": "Ah, I found it! Then where is my bag?",
            "notes": "그러면 = \"then / in that case\"."
          },
          {
            "speaker": "Minsu (민수)",
            "speakerRole": "Korean university student",
            "korean": "가방은 의자 밑에 있어요. 침대 옆이 아니에요.",
            "english": "The bag is under the chair. It is not next to the bed.",
            "notes": "밑 = under/below; 침대 옆 = next to the bed."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "정말 고마워요, 민수 씨!",
            "english": "Thank you so much, Min-su!",
            "notes": "Friendly polite expression of thanks."
          }
        ],
        "vocabulary": [
          {
            "id": "v4-1-1",
            "korean": "방",
            "hanja": "房",
            "romanization": "bang",
            "partOfSpeech": "Noun",
            "english": "room",
            "exampleKorean": "제 방이 아주 따뜻해요.",
            "exampleEnglish": "My room is very warm."
          },
          {
            "id": "v4-1-2",
            "korean": "책상",
            "hanja": "冊床",
            "romanization": "chaeksang",
            "partOfSpeech": "Noun",
            "english": "desk",
            "exampleKorean": "책상 위에 컴퓨터가 있어요.",
            "exampleEnglish": "There is a computer on the desk."
          },
          {
            "id": "v4-1-3",
            "korean": "의자",
            "hanja": "椅子",
            "romanization": "uija",
            "partOfSpeech": "Noun",
            "english": "chair",
            "exampleKorean": "의자에 앉으세요.",
            "exampleEnglish": "Please sit on the chair."
          },
          {
            "id": "v4-1-4",
            "korean": "침대",
            "hanja": "寢臺",
            "romanization": "chimdae",
            "partOfSpeech": "Noun",
            "english": "bed",
            "exampleKorean": "침대 밑에 슬리퍼가 있어요.",
            "exampleEnglish": "There are slippers under the bed."
          },
          {
            "id": "v4-1-5",
            "korean": "위",
            "romanization": "wi",
            "partOfSpeech": "Noun",
            "english": "top / above / on",
            "exampleKorean": "탁자 위에 커피가 있어요.",
            "exampleEnglish": "There is coffee on the table."
          },
          {
            "id": "v4-1-6",
            "korean": "밑 / 아래",
            "romanization": "mit / arae",
            "partOfSpeech": "Noun",
            "english": "bottom / below / underneath",
            "exampleKorean": "의자 밑에 고양이가 있어요.",
            "exampleEnglish": "There is a cat under the chair."
          },
          {
            "id": "v4-1-7",
            "korean": "어디",
            "romanization": "eodi",
            "partOfSpeech": "Noun",
            "english": "where (interrogative pronoun)",
            "exampleKorean": "화장실이 어디예요?",
            "exampleEnglish": "Where is the restroom?"
          }
        ],
        "grammar": [
          {
            "id": "g4-1-1",
            "pattern": "Noun + 에 있어요/없어요",
            "englishMeaning": "to exist / not exist in/at a place (Location marker 에)",
            "formula": "[Noun (Location)] + 에 + [Subject]이/가 + 있어요/없어요",
            "explanation": "The particle -에 marks static location where someone or something exists, sits, or remains. Contrast this with action location marker -에서 which marks where an action takes place.",
            "rules": [
              "Attach -에 directly to the place noun, regardless of whether it ends in a vowel or consonant: 방 + 에 -> 방에, 학교 + 에 -> 학교에.",
              "Use 있어요 to state that the subject is present at that location.",
              "Use 없어요 to state that the subject is absent from that location."
            ],
            "contrastNotes": "Do not confuse location \"에\" (static existence with 있어요/없어요, 살아요, 있어요) with destination \"에\" (direction with 가요/와요).",
            "examples": [
              {
                "korean": "선생님이 교실에 있어요.",
                "english": "The teacher is in the classroom.",
                "breakdown": "선생님 (teacher) + 이 (subject) + 교실 (classroom) + 에 (at) + 있어요 (is)"
              },
              {
                "korean": "민수 씨는 지금 집에 없어요.",
                "english": "Minsu is not at home right now.",
                "breakdown": "민수 씨는 (As for Minsu) + 지금 (now) + 집 (home) + 에 (at) + 없어요 (is not)"
              }
            ]
          },
          {
            "id": "g4-1-2",
            "pattern": "Noun + [위/밑/앞/뒤/옆/안/밖] + 에",
            "englishMeaning": "on / under / in front of / behind / beside / inside / outside",
            "formula": "[Reference Noun] + [Position Word] + 에",
            "explanation": "In Korean, positional words like 위 (top), 밑 (under), 앞 (front), 뒤 (back), 옆 (side), 안 (inside), and 밖 (outside) act as spatial nouns. You place the reference object first, followed by the spatial noun, followed by the location particle 에.",
            "rules": [
              "책상 위 (desk top) + 에 = 책상 위에 (on the desk)",
              "의자 밑 (chair bottom) + 에 = 의자 밑에 (under the chair)",
              "가방 안 (bag inside) + 에 = 가방 안에 (inside the bag)"
            ],
            "examples": [
              {
                "korean": "스마트폰이 가방 안에 있어요.",
                "english": "The smartphone is inside the bag.",
                "breakdown": "스마트폰 + 이 (subject) + 가방 (bag) + 안 (inside) + 에 (at) + 있어요"
              },
              {
                "korean": "고양이가 침대 밑에 있어요.",
                "english": "The cat is underneath the bed.",
                "breakdown": "고양이 (cat) + 가 (subject) + 침대 (bed) + 밑 (under) + 에 (at) + 있어요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d4-1",
          "title": "Spatial Positioning Drills (위치 말하기 연습)",
          "instruction": "Listen carefully, repeat aloud, and substitute the nouns to describe where things are located.",
          "drills": [
            {
              "prompt": "Where is the book? (On the desk)",
              "targetKorean": "책이 책상 위에 있어요.",
              "english": "The book is on the desk.",
              "audioText": "책이 책상 위에 있어요."
            },
            {
              "prompt": "Where is the wallet? (Under the chair)",
              "targetKorean": "지갑이 의자 밑에 있어요.",
              "english": "The wallet is under the chair.",
              "audioText": "지갑이 의자 밑에 있어요."
            },
            {
              "prompt": "Where is the pencil? (Inside the pencil case)",
              "targetKorean": "연필이 필통 안에 있어요.",
              "english": "The pencil is inside the pencil case.",
              "audioText": "연필이 필통 안에 있어요."
            },
            {
              "prompt": "Is Min-su at home right now?",
              "targetKorean": "아니요, 지금 집에 없어요.",
              "english": "No, he is not at home right now.",
              "audioText": "아니요, 지금 집에 없어요."
            }
          ]
        },
        "readingWriting": {
          "id": "rw4-1",
          "readingTitle": "사라의 방 (Sarah's Room)",
          "readingPassage": "여기는 제 방이에요. 제 방에 큰 책상이 있어요. 책상 위에 노트북과 한국어 사전이 있어요. 책상 옆에 편안한 의자가 있어요. 침대 위에는 베개와 이불이 있어요. 하지만 방에 텔레비전은 없어요.",
          "readingTranslation": "This is my room. In my room, there is a big desk. On the desk, there is a laptop and a Korean dictionary. Beside the desk, there is a comfortable chair. On the bed, there are pillows and a blanket. However, there is no television in the room.",
          "comprehensionQuestions": [
            {
              "question": "What is on Sarah's desk?",
              "answer": "노트북과 한국어 사전 (Laptop and Korean dictionary)",
              "explanation": "책상 위에 노트북과 한국어 사전이 있어요."
            },
            {
              "question": "Is there a television in Sarah's room?",
              "answer": "No",
              "explanation": "하지만 방에 텔레비전은 없어요."
            }
          ],
          "writingPrompt": "Describe your study room or bedroom in 5 Korean sentences using location words (위, 밑, 옆, 안) and 있어요/없어요.",
          "writingTemplate": "1. 여기는 제 [방 / 기숙사]예요.\n2. 방에 [가구 1]이/가 있어요.\n3. [가구 1] 위에 [물건]이/가 있어요.\n4. [가구 1] 옆에 [가구 2]이/가 있어요.\n5. 하지만 방에 [없는 물건]은/는 없어요.",
          "sampleAnswer": "여기는 제 방이에요. 방에 책상이 있어요. 책상 위에 컴퓨터가 있어요. 책상 옆에 침대가 있어요. 하지만 방에 텔레비전은 없어요."
        }
      },
      {
        "id": "lesson-4-2",
        "code": "4.2",
        "title": "Asking Where a Place or Building Is",
        "koreanTitle": "카페가 어디예요?",
        "situation": "Inquire about and give directions to facilities, stores, and buildings using 앞, 뒤, 옆, and 건너편.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "When asking strangers on the street for directions in Seoul, start with \"실례합니다\" (Excuse me). Koreans frequently use visible landmarks such as subway station exits (지하철역 출구), convenience stores (편의점), and banks (은행) as navigational anchors.",
        "dialogue": [
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Foreign traveler",
            "korean": "실례합니다, 여기 스타벅스 카페가 어디예요?",
            "english": "Excuse me, where is the Starbucks cafe here?",
            "notes": "실례합니다 = \"Excuse me\" (standard polite opener when asking a stranger)."
          },
          {
            "speaker": "Passerby (행인)",
            "speakerRole": "Local Seoul resident",
            "korean": "저기 지하철역 출구 앞을 보세요. 은행이 있어요.",
            "english": "Look in front of the subway station exit over there. There is a bank.",
            "notes": "출구 = exit; 은행 = bank."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Foreign traveler",
            "korean": "네, 국민은행이 보여요.",
            "english": "Yes, I see the KB Kookmin Bank.",
            "notes": "보여요 = \"is visible / I see it\"."
          },
          {
            "speaker": "Passerby (행인)",
            "speakerRole": "Local Seoul resident",
            "korean": "카페는 은행 바로 옆에 있어요. 약국 뒤예요.",
            "english": "The cafe is right next to the bank. It is behind the pharmacy.",
            "notes": "바로 = \"right / immediately\"; 약국 = pharmacy."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Foreign traveler",
            "korean": "아, 찾았습니다. 정말 감사합니다!",
            "english": "Ah, I found it. Thank you very much!",
            "notes": "Formal polite acknowledgment and gratitude."
          }
        ],
        "vocabulary": [
          {
            "id": "v4-2-1",
            "korean": "카페",
            "romanization": "kape",
            "partOfSpeech": "Noun",
            "english": "cafe / coffee shop",
            "exampleKorean": "카페에서 친구를 만나요.",
            "exampleEnglish": "I meet a friend at the cafe."
          },
          {
            "id": "v4-2-2",
            "korean": "지하철역",
            "hanja": "地下鐵驛",
            "romanization": "jihacheol-yeok",
            "partOfSpeech": "Noun",
            "english": "subway station",
            "exampleKorean": "강남역 2번 출구로 오세요.",
            "exampleEnglish": "Please come to Gangnam Station Exit 2."
          },
          {
            "id": "v4-2-3",
            "korean": "은행",
            "hanja": "銀行",
            "romanization": "eunhaeng",
            "partOfSpeech": "Noun",
            "english": "bank",
            "exampleKorean": "은행이 우체국 옆에 있어요.",
            "exampleEnglish": "The bank is next to the post office."
          },
          {
            "id": "v4-2-4",
            "korean": "약국",
            "hanja": "藥局",
            "romanization": "yakguk",
            "partOfSpeech": "Noun",
            "english": "pharmacy",
            "exampleKorean": "약국에서 감기약을 사요.",
            "exampleEnglish": "I buy cold medicine at the pharmacy."
          },
          {
            "id": "v4-2-5",
            "korean": "앞",
            "romanization": "ap",
            "partOfSpeech": "Noun",
            "english": "front",
            "exampleKorean": "학교 앞에서 만나요.",
            "exampleEnglish": "Let us meet in front of the school."
          },
          {
            "id": "v4-2-6",
            "korean": "뒤",
            "romanization": "dwi",
            "partOfSpeech": "Noun",
            "english": "back / behind",
            "exampleKorean": "건물 뒤에 주차장이 있어요.",
            "exampleEnglish": "There is a parking lot behind the building."
          },
          {
            "id": "v4-2-7",
            "korean": "옆",
            "romanization": "yeop",
            "partOfSpeech": "Noun",
            "english": "side / next to",
            "exampleKorean": "제 옆에 앉으세요.",
            "exampleEnglish": "Please sit next to me."
          },
          {
            "id": "v4-2-8",
            "korean": "건너편 / 맞은편",
            "romanization": "geonneopyeon / majeunpyeon",
            "partOfSpeech": "Noun",
            "english": "across the street / opposite side",
            "exampleKorean": "서점이 길 건너편에 있어요.",
            "exampleEnglish": "The bookstore is across the street."
          }
        ],
        "grammar": [
          {
            "id": "g4-2-1",
            "pattern": "Noun + 이/가 어디예요? / 어디에 있어요?",
            "englishMeaning": "Where is [Noun]?",
            "formula": "[Noun] + 이/가 어디예요? OR [Noun] + 은/는 어디에 있어요?",
            "explanation": "Both forms ask for location. \"어디예요?\" asks what/where the location identity is, while \"어디에 있어요?\" asks at what physical point the subject is located. Both are completely natural.",
            "rules": [
              "Noun ends in consonant: 화장실이 어디예요? / 화장실은 어디에 있어요?",
              "Noun ends in vowel: 카페가 어디예요? / 카페는 어디에 있어요?"
            ],
            "examples": [
              {
                "korean": "편의점이 어디예요?",
                "english": "Where is the convenience store?",
                "breakdown": "편의점 (convenience store) + 이 (subject) + 어디예요? (where is it?)"
              },
              {
                "korean": "지하철역은 어디에 있어요?",
                "english": "As for the subway station, where is it located?",
                "breakdown": "지하철역 (subway station) + 은 (topic) + 어디 (where) + 에 (at) + 있어요? (is it?)"
              }
            ]
          },
          {
            "id": "g4-2-2",
            "pattern": "Noun 1 + [앞/뒤/옆/사이/건너편] + 에 있어요",
            "englishMeaning": "It is in front of / behind / next to / between / across from Noun 1",
            "formula": "[Reference Building] + [Spatial Relation] + 에 있어요",
            "explanation": "Provides exact spatial orientation relative to a well-known building or landmark.",
            "rules": [
              "건물 앞 = in front of the building -> 건물 앞에 있어요",
              "식당 뒤 = behind the restaurant -> 식당 뒤에 있어요",
              "은행과 우체국 사이 = between the bank and post office -> 은행과 우체국 사이에 있어요"
            ],
            "examples": [
              {
                "korean": "약국이 병원 바로 옆에 있어요.",
                "english": "The pharmacy is right next to the hospital.",
                "breakdown": "약국 (pharmacy) + 이 (subject) + 병원 (hospital) + 바로 (right) + 옆 (side) + 에 있어요"
              },
              {
                "korean": "버스 정류장은 백화점 맞은편에 있어요.",
                "english": "The bus stop is across from the department store.",
                "breakdown": "버스 정류장 (bus stop) + 은 (topic) + 백화점 (dept store) + 맞은편 (opposite side) + 에 있어요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d4-2",
          "title": "Street Navigation Drills (길 묻고 답하기 연습)",
          "instruction": "Practice asking for everyday city landmarks and answering using spatial prepositions.",
          "drills": [
            {
              "prompt": "Ask where the subway station is.",
              "targetKorean": "실례합니다, 지하철역이 어디예요?",
              "english": "Excuse me, where is the subway station?",
              "audioText": "실례합니다 지하철역이 어디예요"
            },
            {
              "prompt": "Answer: It is behind the school.",
              "targetKorean": "학교 뒤에 있어요.",
              "english": "It is behind the school.",
              "audioText": "학교 뒤에 있어요."
            },
            {
              "prompt": "Ask where the convenience store is.",
              "targetKorean": "편의점이 어디에 있어요?",
              "english": "Where is the convenience store?",
              "audioText": "편의점이 어디에 있어요"
            },
            {
              "prompt": "Answer: It is right next to the bank.",
              "targetKorean": "은행 바로 옆에 있어요.",
              "english": "It is right next to the bank.",
              "audioText": "은행 바로 옆에 있어요."
            }
          ]
        },
        "readingWriting": {
          "id": "rw4-2",
          "readingTitle": "우리 동네 지도 (Our Neighborhood Map)",
          "readingPassage": "우리 동네는 아주 살기 좋아요. 지하철역 1번 출구 앞에 편의점이 있어요. 편의점 건너편에 맛있는 빵집이 있어요. 빵집 옆에는 큰 병원이 있어요. 그리고 병원 뒤에 조용한 도서관이 있어요.",
          "readingTranslation": "Our neighborhood is very pleasant to live in. There is a convenience store in front of subway station Exit 1. Across from the convenience store, there is a delicious bakery. Next to the bakery, there is a large hospital. And behind the hospital, there is a quiet library.",
          "comprehensionQuestions": [
            {
              "question": "What is located across from the convenience store?",
              "answer": "빵집 (bakery)",
              "explanation": "편의점 건너편에 맛있는 빵집이 있어요."
            },
            {
              "question": "Where is the library located?",
              "answer": "병원 뒤 (behind the hospital)",
              "explanation": "병원 뒤에 조용한 도서관이 있어요."
            }
          ],
          "writingPrompt": "Write 5-6 sentences describing the buildings and landmarks around your home or school campus.",
          "writingTemplate": "1. 제 [학교 / 집] 근처에 많은 건물이 있어요.\n2. [장소 1] 앞에 [장소 2]이/가 있어요.\n3. [장소 2] 옆에 [장소 3]이/가 있어요.\n4. [장소 3] 건너편에는 [장소 4]이/가 있어요.\n5. [장소 1] 뒤에 [장소 5]도 있어요.",
          "sampleAnswer": "제 학교 근처에 많은 건물이 있어요. 정문 앞에 지하철역이 있어요. 지하철역 옆에 편의점이 있어요. 편의점 건너편에는 서점이 있어요. 학교 뒤에 아름다운 공원도 있어요."
        }
      }
    ]
  },
  {
    "id": "unit-5",
    "unitNum": 5,
    "partId": "B",
    "partName": "Part B: Everyday Needs",
    "title": "Food and Ordering",
    "koreanTitle": "음식과 주문하기",
    "overview": "Order drinks and meals confidently, specify quantities with native Korean numbers and counters (개, 잔, 병), and link items using 하고 and 와/과.",
    "lessons": [
      {
        "id": "lesson-5-1",
        "code": "5.1",
        "title": "Ordering a Drink at a Café",
        "koreanTitle": "카페에서 음료 주문하기",
        "situation": "Order drinks, request quantities with native numbers (하나, 둘, 셋) and counter 잔, and use 주세요 politely.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korean cafes, the default iced drink is often abbreviated: \"아아\" (아이스 아메리카노). When ordering, state the drink temperature first (따뜻한 for hot, 아이스 for iced), followed by the item name, the quantity with counter (한 잔, 두 잔), and finish with \"주세요\" (please give me). If you want takeaway, say \"포장해 주세요\" or \"테이크아웃해 주세요\".",
        "dialogue": [
          {
            "speaker": "Barista (바리스타)",
            "speakerRole": "Cafe staff",
            "korean": "어서 오세요! 주문하시겠어요?",
            "english": "Welcome! Would you like to order?",
            "notes": "주문하시겠어요? = Standard honorific polite greeting at food establishments."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Customer",
            "korean": "네, 따뜻한 아메리카노 한 잔 주세요.",
            "english": "Yes, please give me one warm Americano.",
            "notes": "따뜻한 = warm/hot; 한 잔 = one cup."
          },
          {
            "speaker": "Barista (바리스타)",
            "speakerRole": "Cafe staff",
            "korean": "더 필요하신 것은 없으세요?",
            "english": "Is there anything else you need?",
            "notes": "Standard polite question checking for additional items."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Customer",
            "korean": "그리고 치즈 케이크 하나 주세요. 포장해 주세요.",
            "english": "And please give me one cheese cake. Please wrap it to go.",
            "notes": "포장해 주세요 = \"Please package it / to go\"."
          },
          {
            "speaker": "Barista (바리스타)",
            "speakerRole": "Cafe staff",
            "korean": "네, 알겠습니다. 진동벨을 받으세요.",
            "english": "Yes, understood. Please take the buzzer pager.",
            "notes": "진동벨 = vibrating buzzer pager ubiquitous in Korean cafes."
          }
        ],
        "vocabulary": [
          {
            "id": "v5-1-1",
            "korean": "커피",
            "romanization": "keopi",
            "partOfSpeech": "Noun",
            "english": "coffee",
            "exampleKorean": "저는 아침마다 커피를 마셔요.",
            "exampleEnglish": "I drink coffee every morning."
          },
          {
            "id": "v5-1-2",
            "korean": "녹차",
            "hanja": "綠茶",
            "romanization": "nokcha",
            "partOfSpeech": "Noun",
            "english": "green tea",
            "exampleKorean": "따뜻한 녹차 두 잔 주세요.",
            "exampleEnglish": "Please give me two cups of hot green tea."
          },
          {
            "id": "v5-1-3",
            "korean": "물",
            "romanization": "mul",
            "partOfSpeech": "Noun",
            "english": "water",
            "exampleKorean": "시원한 물 한 잔 주세요.",
            "exampleEnglish": "Please give me a glass of cold water."
          },
          {
            "id": "v5-1-4",
            "korean": "주스",
            "romanization": "juseu",
            "partOfSpeech": "Noun",
            "english": "juice",
            "exampleKorean": "오렌지 주스 세 잔 있어요.",
            "exampleEnglish": "There are three glasses of orange juice."
          },
          {
            "id": "v5-1-5",
            "korean": "잔",
            "hanja": "盞",
            "romanization": "jan",
            "partOfSpeech": "Counter",
            "english": "counter for cups/glasses",
            "exampleKorean": "커피 한 잔, 물 두 잔",
            "exampleEnglish": "One cup of coffee, two glasses of water"
          },
          {
            "id": "v5-1-6",
            "korean": "개",
            "hanja": "個",
            "romanization": "gae",
            "partOfSpeech": "Counter",
            "english": "general counter for objects/items",
            "exampleKorean": "사과 세 개 주세요.",
            "exampleEnglish": "Please give me three apples."
          },
          {
            "id": "v5-1-7",
            "korean": "하나 / 둘 / 셋 / 넷",
            "romanization": "hana / dul / set / net",
            "partOfSpeech": "Noun",
            "english": "native Korean numbers 1, 2, 3, 4",
            "exampleKorean": "Before counters: 한 개, 두 개, 세 개, 네 개.",
            "exampleEnglish": "1 item, 2 items, 3 items, 4 items."
          },
          {
            "id": "v5-1-8",
            "korean": "주세요",
            "romanization": "juseyo",
            "partOfSpeech": "Expression",
            "english": "please give me",
            "exampleKorean": "메뉴판 좀 주세요.",
            "exampleEnglish": "Please give me the menu."
          }
        ],
        "grammar": [
          {
            "id": "g5-1-1",
            "pattern": "Noun + (Number + Counter) + 주세요",
            "englishMeaning": "Please give me [X amount of Noun]",
            "formula": "[Item Noun] + [Native Number modifier] + [Counter] + 주세요",
            "explanation": "When counting items in Korean, Native Korean numbers (하나, 둘, 셋, 넷, 다섯...) undergo a phonetic shortening before counters: 하나 -> 한, 둘 -> 두, 셋 -> 세, 넷 -> 네, 스물 -> 스무.",
            "rules": [
              "커피 1잔: 커피 한 잔 주세요 (NOT 하나 잔)",
              "물 2잔: 물 두 잔 주세요 (NOT 둘 잔)",
              "케이크 3개: 케이크 세 개 주세요 (NOT 셋 개)",
              "빵 4개: 빵 네 개 주세요 (NOT 넷 개)"
            ],
            "examples": [
              {
                "korean": "아이스 아메리카노 한 잔 주세요.",
                "english": "Please give me one iced Americano.",
                "breakdown": "아이스 아메리카노 + 한 (1) + 잔 (cup) + 주세요 (give me please)"
              },
              {
                "korean": "쿠키 두 개 주세요.",
                "english": "Please give me two cookies.",
                "breakdown": "쿠키 (cookies) + 두 (2) + 개 (counter) + 주세요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d5-1",
          "title": "Cafe Counter Drills (카페 주문 연습)",
          "instruction": "Shadow each sentence and practice substituting drink orders and quantities smoothly.",
          "drills": [
            {
              "prompt": "Order 1 hot green tea.",
              "targetKorean": "따뜻한 녹차 한 잔 주세요.",
              "english": "Please give me one hot green tea.",
              "audioText": "따뜻한 녹차 한 잔 주세요"
            },
            {
              "prompt": "Order 2 iced coffees.",
              "targetKorean": "아이스 커피 두 잔 주세요.",
              "english": "Please give me two iced coffees.",
              "audioText": "아이스 커피 두 잔 주세요"
            },
            {
              "prompt": "Order 3 glasses of water.",
              "targetKorean": "물 세 잔 주세요.",
              "english": "Please give me three glasses of water.",
              "audioText": "물 세 잔 주세요"
            },
            {
              "prompt": "Order 1 sandwich to go.",
              "targetKorean": "샌드위치 하나 포장해 주세요.",
              "english": "Please wrap one sandwich to go.",
              "audioText": "샌드위치 하나 포장해 주세요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw5-1",
          "readingTitle": "카페 메뉴판 (Cafe Menu Receipt)",
          "readingPassage": "서울카페 영수증\n--------------------\n아메리카노 (Ice)  2잔  9,000원\n카페라떼 (Hot)   1잔  5,000원\n초코 머핀         1개  3,500원\n--------------------\n합계: 17,500원\n결제 완료 (신용카드)",
          "readingTranslation": "Seoul Cafe Receipt\n--------------------\nAmericano (Ice) 2 cups 9,000 KRW\nCafe Latte (Hot) 1 cup 5,000 KRW\nChocolate Muffin 1 item 3,500 KRW\n--------------------\nTotal: 17,500 KRW\nPayment Complete (Credit Card)",
          "comprehensionQuestions": [
            {
              "question": "How many cups of iced Americano were ordered?",
              "answer": "2잔 (2 cups)",
              "explanation": "아메리카노 (Ice) 2잔"
            },
            {
              "question": "What is the total price on the receipt?",
              "answer": "17,500원 (17,500 KRW)",
              "explanation": "합계: 17,500원"
            }
          ],
          "writingPrompt": "Write a realistic 4-line cafe ordering dialogue between a barista and yourself.",
          "writingTemplate": "점원: 어서 오세요! 주문하시겠어요?\n나: 네, [음료 1] [수량] 잔 주세요.\n점원: 더 필요한 것 있으세요?\n나: 그리고 [디저트 / 음료 2] [수량] 개 주세요.",
          "sampleAnswer": "점원: 어서 오세요! 주문하시겠어요?\n나: 네, 따뜻한 카페라떼 한 잔 주세요.\n점원: 더 필요한 것 있으세요?\n나: 그리고 딸기 케이크 하나 주세요. 감사합니다."
        }
      },
      {
        "id": "lesson-5-2",
        "code": "5.2",
        "title": "Ordering Food at a Restaurant",
        "koreanTitle": "식당에서 음식 주문하기",
        "situation": "Order Korean meals using the object particle 을/를 and connect items with 하고 and 와/과.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korean casual restaurants (분식집, 한식당), there are usually no table bells or servers hovering. To call the server politely, raise your hand slightly and say \"여기요!\" (Over here!) or \"저기요!\" (Excuse me over there!). Water and side dishes (반찬) are frequently self-service (\"물은 셀프입니다\").",
        "dialogue": [
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Host student",
            "korean": "사라 씨, 한국 음식 좋아해요? 뭐 먹을래요?",
            "english": "Sarah, do you like Korean food? What would you like to eat?",
            "notes": "뭐 먹을래요? = \"What would you like to eat?\""
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "저는 비빔밥을 정말 좋아해요. 불고기도 좋아해요.",
            "english": "I really like bibimbap. I also like bulgogi.",
            "notes": "을/를 marks the grammatical direct object of liking/eating."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Host student",
            "korean": "여기요! 비빔밥 하나하고 불고기 일 인분 주세요.",
            "english": "Over here! Please give us one bibimbap and one serving of bulgogi.",
            "notes": "여기요 = Polite call to restaurant staff; 인분 = portion counter."
          },
          {
            "speaker": "Server (식당 이모님)",
            "speakerRole": "Restaurant server",
            "korean": "네! 찌개도 드릴까요? 김치찌개와 된장찌개가 맛있어요.",
            "english": "Yes! Shall I give you stew too? The kimchi stew and soybean paste stew are delicious.",
            "notes": "와/과 = formal/written \"and\"; 찌개 = stew."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Host student",
            "korean": "된장찌개 하나 주세요. 그리고 시원한 물도 주세요.",
            "english": "Please give us one soybean paste stew. And please give us cold water too.",
            "notes": "하나 주세요 = \"Give us one please\"."
          }
        ],
        "vocabulary": [
          {
            "id": "v5-2-1",
            "korean": "밥 / 쌀밥",
            "romanization": "bap / ssalbap",
            "partOfSpeech": "Noun",
            "english": "cooked rice / meal",
            "exampleKorean": "밥을 맛있게 먹어요.",
            "exampleEnglish": "I eat the meal deliciously."
          },
          {
            "id": "v5-2-2",
            "korean": "비빔밥",
            "romanization": "bibimbap",
            "partOfSpeech": "Noun",
            "english": "bibimbap (mixed rice with vegetables and meat)",
            "exampleKorean": "전주 비빔밥을 제일 좋아해요.",
            "exampleEnglish": "I like Jeonju bibimbap the most."
          },
          {
            "id": "v5-2-3",
            "korean": "불고기",
            "romanization": "bulgogi",
            "partOfSpeech": "Noun",
            "english": "bulgogi (marinated grilled beef)",
            "exampleKorean": "불고기 이 인분 주세요.",
            "exampleEnglish": "Please give us two servings of bulgogi."
          },
          {
            "id": "v5-2-4",
            "korean": "김치찌개",
            "romanization": "gimchijjigae",
            "partOfSpeech": "Noun",
            "english": "kimchi stew",
            "exampleKorean": "김치찌개가 조금 매워요.",
            "exampleEnglish": "The kimchi stew is a little spicy."
          },
          {
            "id": "v5-2-5",
            "korean": "된장찌개",
            "romanization": "doenjangjjigae",
            "partOfSpeech": "Noun",
            "english": "soybean paste stew",
            "exampleKorean": "된장찌개가 아주 구수해요.",
            "exampleEnglish": "The soybean paste stew is very rich and savory."
          },
          {
            "id": "v5-2-6",
            "korean": "하고 / 와 / 과",
            "romanization": "hago / wa / gwa",
            "partOfSpeech": "Particle",
            "english": "and / with (connecting nouns)",
            "exampleKorean": "비빔밥하고 콜라 주세요.",
            "exampleEnglish": "Please give me bibimbap and cola."
          },
          {
            "id": "v5-2-7",
            "korean": "인분",
            "hanja": "人份",
            "romanization": "inbun",
            "partOfSpeech": "Counter",
            "english": "counter for food portions/servings (uses Sino-Korean numbers)",
            "exampleKorean": "삼겹살 2인분 (이 인분) 주세요.",
            "exampleEnglish": "Please give us 2 servings of pork belly."
          }
        ],
        "grammar": [
          {
            "id": "g5-2-1",
            "pattern": "Noun + 을/를",
            "englishMeaning": "Object particle (marks the direct object of a transitive verb)",
            "formula": "Consonant ends + 을 | Vowel ends + 를",
            "explanation": "The object particle attaches to the receiver of the action (eating, buying, studying, drinking).",
            "rules": [
              "Noun ends in a consonant (받침 O): 밥 -> 밥을, 물 -> 물을, 책 -> 책을",
              "Noun ends in a vowel (받침 X): 커피 -> 커피를, 사과 -> 사과를, 불고기 -> 불고기를"
            ],
            "examples": [
              {
                "korean": "저는 비빔밥을 먹어요.",
                "english": "I eat bibimbap.",
                "breakdown": "저 (I) + 는 (topic) + 비빔밥 (bibimbap) + 을 (object) + 먹어요 (eat)"
              },
              {
                "korean": "민수 씨는 녹차를 마셔요.",
                "english": "Minsu drinks green tea.",
                "breakdown": "민수 씨는 + 녹차 (green tea) + 를 (object) + 마셔요 (drinks)"
              }
            ]
          },
          {
            "id": "g5-2-2",
            "pattern": "Noun 1 + 하고 / 와 / 과 + Noun 2",
            "englishMeaning": "Noun 1 and Noun 2 (listing items)",
            "formula": "Conversational: Noun 1 + 하고 + Noun 2 | Formal: Consonant + 과, Vowel + 와",
            "explanation": "-하고 is the universal spoken particle for \"and\" connecting nouns. -와/과 is slightly more formal/literary.",
            "rules": [
              "하고 attaches identically to consonants and vowels: 밥하고 고기, 사과하고 바나나.",
              "와/과 selects by final sound: 김치(vowel) + 와 -> 김치와; 밥(consonant) + 과 -> 밥과."
            ],
            "examples": [
              {
                "korean": "불고기하고 냉면을 주문해요.",
                "english": "We order bulgogi and cold noodles.",
                "breakdown": "불고기 + 하고 (and) + 냉면 (cold noodles) + 을 (object) + 주문해요 (order)"
              },
              {
                "korean": "책과 공책이 책상에 있어요.",
                "english": "There are books and notebooks on the desk.",
                "breakdown": "책 (book) + 과 (and) + 공책 (notebook) + 이 (subject) + 책상에 있어요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d5-2",
          "title": "Restaurant Ordering Drills (식당 주문 연습)",
          "instruction": "Say the orders out loud with confidence using 을/를 and 하고.",
          "drills": [
            {
              "prompt": "Call the server and order 1 bibimbap.",
              "targetKorean": "여기요! 비빔밥 하나 주세요.",
              "english": "Over here! Please give me one bibimbap.",
              "audioText": "여기요 비빔밥 하나 주세요"
            },
            {
              "prompt": "Order 2 servings of bulgogi and 1 cola.",
              "targetKorean": "불고기 이 인분하고 콜라 하나 주세요.",
              "english": "Please give us two servings of bulgogi and one cola.",
              "audioText": "불고기 이 인분하고 콜라 하나 주세요"
            },
            {
              "prompt": "State: I eat kimchi stew and rice.",
              "targetKorean": "저는 김치찌개하고 밥을 먹어요.",
              "english": "I eat kimchi stew and rice.",
              "audioText": "저는 김치찌개하고 밥을 먹어요"
            },
            {
              "prompt": "Ask: Please give us cold water too.",
              "targetKorean": "시원한 물도 주세요.",
              "english": "Please give us cold water too.",
              "audioText": "시원한 물도 주세요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw5-2",
          "readingTitle": "인기 한식당 차림표 (Popular Korean Restaurant Menu)",
          "readingPassage": "행복식당 차림표 (메뉴)\n- 돌솥비빔밥: 8,000원\n- 김치찌개 (공깃밥 포함): 7,500원\n- 불고기 백반: 9,000원\n- 해물파전: 12,000원\n- 음료수 (콜라/사이다): 2,000원\n* 물과 추가 반찬은 셀프입니다. 맛있게 드세요!",
          "readingTranslation": "Happiness Restaurant Menu\n- Hot Stone Bibimbap: 8,000 KRW\n- Kimchi Stew (steamed rice included): 7,500 KRW\n- Bulgogi Set Meal: 9,000 KRW\n- Seafood Scallion Pancake: 12,000 KRW\n- Soft Drinks (Cola/Cider): 2,000 KRW\n* Water and extra side dishes are self-service. Bon appetit!",
          "comprehensionQuestions": [
            {
              "question": "Is steamed rice included with the Kimchi Stew?",
              "answer": "Yes (공깃밥 포함)",
              "explanation": "김치찌개 (공깃밥 포함): 7,500원"
            },
            {
              "question": "How much does the Seafood Scallion Pancake cost?",
              "answer": "12,000원",
              "explanation": "해물파전: 12,000원"
            }
          ],
          "writingPrompt": "Write a 6-sentence restaurant interaction where you call the server, order 2 main dishes and a drink, and ask for water.",
          "writingTemplate": "1. 손님: 저기요! 주문할게요.\n2. 직원: 네, 말씀하세요!\n3. 손님: [음식 1] [수량]하고 [음식 2] [수량] 주세요.\n4. 직원: 마실 것은 필요 없으세요?\n5. 손님: [음료] [수량]도 주세요.\n6. 손님: 그리고 시원한 물 좀 주세요.",
          "sampleAnswer": "손님: 저기요! 주문할게요.\n직원: 네, 말씀하세요!\n손님: 비빔밥 하나하고 된장찌개 하나 주세요.\n직원: 마실 것은 필요 없으세요?\n손님: 콜라 한 캔도 주세요.\n손님: 그리고 시원한 물 좀 주세요. 감사합니다."
        }
      }
    ]
  },
  {
    "id": "unit-6",
    "unitNum": 6,
    "partId": "B",
    "partName": "Part B: Everyday Needs",
    "title": "Shopping and Prices",
    "koreanTitle": "쇼핑과 가격",
    "overview": "Inquire about prices using 얼마예요, understand large Sino-Korean numbers (십, 백, 천, 만), and use appropriate classifiers (개, 병, 권, 벌, 켤레).",
    "lessons": [
      {
        "id": "lesson-6-1",
        "code": "6.1",
        "title": "Asking the Price of an Item",
        "koreanTitle": "얼마예요? 와 가격 묻기",
        "situation": "Ask prices with 얼마예요 and master Sino-Korean numbers for Korean currency (원).",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korea, the currency is the Won (원). Prices utilize Sino-Korean numbers: 일(1), 이(2), 삼(3), 사(4), 오(5), 육(6), 칠(7), 팔(8), 구(9), 십(10), 백(100), 천(1,000), 만(10,000). Crucially, Korean numbers group in units of four zeros (만 = 10,000), so 50,000 Won is 오만 원.",
        "dialogue": [
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Customer",
            "korean": "사장님, 이 한국어 연습장 얼마예요?",
            "english": "Owner, how much is this Korean practice notebook?",
            "notes": "사장님 = Polite title for shopkeepers/business owners."
          },
          {
            "speaker": "Clerk (문구점 사장님)",
            "speakerRole": "Stationery shop owner",
            "korean": "그 공책은 삼천오백 원이에요.",
            "english": "That notebook is 3,500 Won.",
            "notes": "3,500 = 삼천 (3,000) + 오백 (500)."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Customer",
            "korean": "그러면 저 모나미 볼펜은 얼마예요?",
            "english": "Then how much is that Monami ballpoint pen over there?",
            "notes": "저 = \"that over there (far from both)\"."
          },
          {
            "speaker": "Clerk (문구점 사장님)",
            "speakerRole": "Stationery shop owner",
            "korean": "볼펜은 천 원이에요. 아주 잘 써져요.",
            "english": "The ballpoint pen is 1,000 Won. It writes very well.",
            "notes": "천 = 1,000 (not 일천; prefix 1 is omitted for thousands)."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Customer",
            "korean": "공책 두 권하고 볼펜 세 자루 주세요. 여기 만 원 있어요.",
            "english": "Please give me two notebooks and three pens. Here is 10,000 Won.",
            "notes": "권 = counter for books/notebooks; 자루 = counter for pens/writing instruments."
          }
        ],
        "vocabulary": [
          {
            "id": "v6-1-1",
            "korean": "얼마",
            "romanization": "eolma",
            "partOfSpeech": "Noun",
            "english": "how much (price/amount)",
            "exampleKorean": "이 사과 얼마예요?",
            "exampleEnglish": "How much is this apple?"
          },
          {
            "id": "v6-1-2",
            "korean": "원",
            "hanja": "圓",
            "romanization": "won",
            "partOfSpeech": "Counter",
            "english": "Korean Won (currency unit)",
            "exampleKorean": "오천 원입니다.",
            "exampleEnglish": "It is 5,000 Won."
          },
          {
            "id": "v6-1-3",
            "korean": "백 / 천 / 만",
            "hanja": "百 / 千 / 萬",
            "romanization": "baek / cheon / man",
            "partOfSpeech": "Noun",
            "english": "hundred (100) / thousand (1,000) / ten thousand (10,000)",
            "exampleKorean": "이 티셔츠는 이만오천 원이에요.",
            "exampleEnglish": "This T-shirt is 25,000 Won."
          },
          {
            "id": "v6-1-4",
            "korean": "옷",
            "romanization": "ot",
            "partOfSpeech": "Noun",
            "english": "clothes / clothing",
            "exampleKorean": "백화점에서 예쁜 옷을 사요.",
            "exampleEnglish": "I buy pretty clothes at the department store."
          },
          {
            "id": "v6-1-5",
            "korean": "비싸다 / 비싸요",
            "romanization": "bissada / bissayo",
            "partOfSpeech": "Adjective",
            "english": "to be expensive",
            "exampleKorean": "이 가방은 너무 비싸요.",
            "exampleEnglish": "This bag is too expensive."
          },
          {
            "id": "v6-1-6",
            "korean": "싸다 / 싸요",
            "romanization": "ssada / ssayo",
            "partOfSpeech": "Adjective",
            "english": "to be cheap / inexpensive",
            "exampleKorean": "시장은 물건이 아주 싸요.",
            "exampleEnglish": "Goods are very cheap at the traditional market."
          }
        ],
        "grammar": [
          {
            "id": "g6-1-1",
            "pattern": "Noun + 은/는 얼마예요?",
            "englishMeaning": "How much is [Noun]?",
            "formula": "[Item Noun] + 은/는 + 얼마예요?",
            "explanation": "The universal formula to ask the price of any product or service.",
            "rules": [
              "Attach 은 if the noun ends in a consonant: 이 옷은 얼마예요?",
              "Attach 는 if the noun ends in a vowel: 이 모자는 얼마예요?"
            ],
            "examples": [
              {
                "korean": "이 청바지는 얼마예요?",
                "english": "How much are these jeans?",
                "breakdown": "이 (this) + 청바지 (jeans) + 는 (topic) + 얼마예요? (how much is it?)"
              },
              {
                "korean": "사과 한 상자는 얼마예요?",
                "english": "How much is one box of apples?",
                "breakdown": "사과 (apple) + 한 상자 (one box) + 는 + 얼마예요?"
              }
            ]
          },
          {
            "id": "g6-1-2",
            "pattern": "Sino-Korean Currency Reading: [Number] + 원이에요/예요",
            "englishMeaning": "It is [X] Won",
            "formula": "[Sino-Korean Number] + 원 + 이에요 (ends in consonant) / 예요",
            "explanation": "Because 원 ends in the consonant ㄴ, it always takes 이에요: 원이에요 (pronounced 워니에요 through liaison). Notice 1,000 is 천 원 (never 일천 원) and 10,000 is 만 원 (never 일만 원).",
            "rules": [
              "1,500 KRW = 천오백 원이에요",
              "12,000 KRW = 만 이천 원이에요",
              "45,000 KRW = 사만 오천 원이에요"
            ],
            "examples": [
              {
                "korean": "모두 합해서 이만 팔천 원이에요.",
                "english": "In total it is 28,000 Won.",
                "breakdown": "모두 합해서 (all together) + 이만 팔천 (28,000) + 원이에요 (it is Won)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d6-1",
          "title": "Price Conversion & Asking Drills (가격 묻기 연습)",
          "instruction": "Practice asking prices and reading Korean Won amounts without hesitation.",
          "drills": [
            {
              "prompt": "Ask: How much is this hat?",
              "targetKorean": "이 모자는 얼마예요?",
              "english": "How much is this hat?",
              "audioText": "이 모자는 얼마예요"
            },
            {
              "prompt": "Say: It is 15,000 Won.",
              "targetKorean": "만 오천 원이에요.",
              "english": "It is 15,000 Won.",
              "audioText": "만 오천 원이에요"
            },
            {
              "prompt": "Ask: How much is that jacket over there?",
              "targetKorean": "저 재킷은 얼마예요?",
              "english": "How much is that jacket over there?",
              "audioText": "저 재킷은 얼마예요"
            },
            {
              "prompt": "Say: It is 89,000 Won.",
              "targetKorean": "팔만 구천 원이에요.",
              "english": "It is 89,000 Won.",
              "audioText": "팔만 구천 원이에요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw6-1",
          "readingTitle": "동대문 패션몰 가격표 (Dongdaemun Price Tags)",
          "readingPassage": "동대문 쇼핑몰 세일 행사!\n- 흰색 면 티셔츠: 10,000원 (만 원)\n- 청바지: 35,000원 (삼만 오천 원)\n- 겨울 털모자: 12,000원 (만 이천 원)\n- 양말 5켤레 묶음: 5,000원 (오천 원)\n* 카드 결제 및 현금 결제 모두 가능합니다.",
          "readingTranslation": "Dongdaemun Shopping Mall Sale Event!\n- White Cotton T-shirt: 10,000 KRW (man won)\n- Blue Jeans: 35,000 KRW (sam-man o-cheon won)\n- Winter Beanie Hat: 12,000 KRW (man i-cheon won)\n- 5-pair bundle of socks: 5,000 KRW (o-cheon won)\n* Both card and cash payments accepted.",
          "comprehensionQuestions": [
            {
              "question": "How much are the blue jeans in Korean?",
              "answer": "삼만 오천 원 (35,000 KRW)",
              "explanation": "청바지: 35,000원 (삼만 오천 원)"
            },
            {
              "question": "How much does the 5-pair bundle of socks cost?",
              "answer": "5,000원 (오천 원)",
              "explanation": "양말 5켤레 묶음: 5,000원"
            }
          ],
          "writingPrompt": "Create a personal shopping budget list of 4 items you want to buy with item names and prices written out in Korean words.",
          "writingTemplate": "1. [물건 1]: [한글 숫자] 원\n2. [물건 2]: [한글 숫자] 원\n3. [물건 3]: [한글 숫자] 원\n4. [물건 4]: [한글 숫자] 원\n5. 총합계는 [한글 총금액] 원이에요.",
          "sampleAnswer": "1. 한국어 책: 만 오천 원\n2. 필통: 육천 원\n3. 볼펜 두 개: 이천 원\n4. 커피 한 잔: 사천오백 원\n총합계는 이만 칠천오백 원이에요."
        }
      },
      {
        "id": "lesson-6-2",
        "code": "6.2",
        "title": "Buying Multiple Items and Counters",
        "koreanTitle": "물건 여러 개 사기와 단위 명사",
        "situation": "Count diverse items using specific Korean classifiers: 권 (books), 벌 (clothes), 켤레 (shoes/socks), 병 (bottles), and 마리 (animals).",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Korean uses specialized noun classifiers (단위 명사) matched to the physical nature of the object. While 개 is a universal general counter for inanimate items, polite and natural Korean requires specific counters for clothing (벌), books (권), bottles (병), paper sheets (장), and footwear pairs (켤레). Additionally, Korean merchants frequently offer \"서비스\" (small complimentary gifts or discounts) for good customers.",
        "dialogue": [
          {
            "speaker": "Clerk (점원)",
            "speakerRole": "Clothing store clerk",
            "korean": "손님, 어떤 옷을 찾으세요?",
            "english": "Customer, what kind of clothes are you looking for?",
            "notes": "어떤 = \"what kind of\"."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Customer",
            "korean": "이 검은색 바지하고 흰색 셔츠를 보고 싶어요.",
            "english": "I want to see these black trousers and white shirt.",
            "notes": "검은색 = black color; 흰색 = white color."
          },
          {
            "speaker": "Clerk (점원)",
            "speakerRole": "Clothing store clerk",
            "korean": "여기 사이즈별로 다 있어요. 한번 입어 보세요.",
            "english": "We have all of them by size here. Please try them on.",
            "notes": "입어 보세요 = \"Please try it on\"."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Customer",
            "korean": "정말 마음에 들어요! 바지 한 벌하고 셔츠 두 벌 주세요.",
            "english": "I really like them! Please give me one pair of trousers and two shirts.",
            "notes": "벌 = counter for suits/sets of clothing; 마음에 들어요 = \"I like it / it suits my heart\"."
          },
          {
            "speaker": "Clerk (점원)",
            "speakerRole": "Clothing store clerk",
            "korean": "네! 양말 두 켤레도 서비스로 드릴게요.",
            "english": "Yes! I will also give you two pairs of socks as a complimentary bonus service.",
            "notes": "켤레 = counter for footwear/socks; 서비스 = complimentary store gift."
          }
        ],
        "vocabulary": [
          {
            "id": "v6-2-1",
            "korean": "권",
            "hanja": "卷",
            "romanization": "gwon",
            "partOfSpeech": "Counter",
            "english": "counter for bound volumes (books, magazines, notebooks)",
            "exampleKorean": "소설책 세 권을 빌렸어요.",
            "exampleEnglish": "I borrowed three novels."
          },
          {
            "id": "v6-2-2",
            "korean": "벌",
            "romanization": "beol",
            "partOfSpeech": "Counter",
            "english": "counter for suits of clothing (shirts, coats, dresses, trousers)",
            "exampleKorean": "정장 한 벌을 샀어요.",
            "exampleEnglish": "I bought one suit."
          },
          {
            "id": "v6-2-3",
            "korean": "켤레",
            "romanization": "kyeolle",
            "partOfSpeech": "Counter",
            "english": "counter for footwear pairs (shoes, socks, gloves)",
            "exampleKorean": "운동화 한 켤레에 오만 원이에요.",
            "exampleEnglish": "One pair of sneakers is 50,000 Won."
          },
          {
            "id": "v6-2-4",
            "korean": "병",
            "hanja": "甁",
            "romanization": "byeong",
            "partOfSpeech": "Counter",
            "english": "counter for bottles",
            "exampleKorean": "생수 세 병을 샀어요.",
            "exampleEnglish": "I bought three bottles of mineral water."
          },
          {
            "id": "v6-2-5",
            "korean": "마리",
            "romanization": "mari",
            "partOfSpeech": "Counter",
            "english": "counter for animals, fish, birds",
            "exampleKorean": "강아지 한 마리와 고양이 두 마리가 있어요.",
            "exampleEnglish": "There is one puppy and two cats."
          },
          {
            "id": "v6-2-6",
            "korean": "장",
            "hanja": "張",
            "romanization": "jang",
            "partOfSpeech": "Counter",
            "english": "counter for flat sheets of paper, tickets, photos",
            "exampleKorean": "영화표 두 장 주세요.",
            "exampleEnglish": "Please give me two movie tickets."
          }
        ],
        "grammar": [
          {
            "id": "g6-2-1",
            "pattern": "Noun + Native Number Modifier + Specific Counter",
            "englishMeaning": "Accurate classifier matching in Korean",
            "formula": "[Noun] + [한 / 두 / 세 / 네 / 다섯...] + [권 / 벌 / 켤레 / 병 / 장 / 마리]",
            "explanation": "Always remember to use the shortened Native Korean number stems (한, 두, 세, 네, 스무) directly preceding the classifier noun.",
            "rules": [
              "Books: 책 한 권, 책 두 권, 책 세 권",
              "Clothes: 옷 한 벌, 셔츠 두 벌",
              "Shoes: 구두 한 켤레, 양말 세 켤레",
              "Bottles: 콜라 한 병, 맥주 두 병",
              "Sheets: 종이 한 장, 티켓 두 장"
            ],
            "examples": [
              {
                "korean": "서점에서 소설책 두 권을 샀어요.",
                "english": "I bought two novels at the bookstore.",
                "breakdown": "서점에서 (at bookstore) + 소설책 (novel) + 두 권 (2 volumes) + 을 + 샀어요"
              },
              {
                "korean": "시장에서 사과 다섯 개와 생수 두 병을 샀어요.",
                "english": "I bought five apples and two bottles of water at the market.",
                "breakdown": "사과 다섯 개 (5 apples) + 와 (and) + 생수 두 병 (2 water bottles)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d6-2",
          "title": "Counter Accuracy Drills (단위 명사 연습)",
          "instruction": "Replace the general counter 개 with the exact Korean classifier word.",
          "drills": [
            {
              "prompt": "Buy 2 shirts (clothes counter: 벌).",
              "targetKorean": "셔츠 두 벌 주세요.",
              "english": "Please give me two shirts.",
              "audioText": "셔츠 두 벌 주세요"
            },
            {
              "prompt": "Buy 1 pair of shoes (pair counter: 켤레).",
              "targetKorean": "운동화 한 켤레 주세요.",
              "english": "Please give me one pair of sneakers.",
              "audioText": "운동화 한 켤레 주세요"
            },
            {
              "prompt": "Buy 3 Korean books (book counter: 권).",
              "targetKorean": "한국어 책 세 권 주세요.",
              "english": "Please give me three Korean books.",
              "audioText": "한국어 책 세 권 주세요"
            },
            {
              "prompt": "Buy 2 bottles of water (bottle counter: 병).",
              "targetKorean": "생수 두 병 주세요.",
              "english": "Please give me two bottles of mineral water.",
              "audioText": "생수 두 병 주세요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw6-2",
          "readingTitle": "주말 벼룩시장 쇼핑 일기 (Flea Market Shopping Note)",
          "readingPassage": "토요일에 홍대 벼룩시장에 갔어요. 시장에 사람이 아주 많았어요. 저는 빈티지 모자 하나와 따뜻한 스웨터 한 벌을 샀어요. 가격도 삼만 원으로 아주 쌌어요. 친구는 귀여운 인형 두 개와 재미있는 만화책 세 권을 샀어요. 정말 즐거웠어요.",
          "readingTranslation": "On Saturday, I went to the Hongdae flea market. There were very many people at the market. I bought one vintage hat and one warm sweater. The price was also very cheap at 30,000 Won. My friend bought two cute dolls and three interesting comic books. It was really enjoyable.",
          "comprehensionQuestions": [
            {
              "question": "What clothing item did the writer buy?",
              "answer": "스웨터 한 벌 (One sweater)",
              "explanation": "따뜻한 스웨터 한 벌을 샀어요."
            },
            {
              "question": "How many comic books did the writer's friend buy?",
              "answer": "세 권 (3 volumes)",
              "explanation": "재미있는 만화책 세 권을 샀어요."
            }
          ],
          "writingPrompt": "Write a 5-sentence paragraph describing what you purchased at a store or market, specifying at least 3 items with their exact counters.",
          "writingTemplate": "1. 저는 어제 [장소]에서 쇼핑을 했어요.\n2. [물건 1] [수량 + 단위명사]을/를 샀어요.\n3. [물건 2] [수량 + 단위명사]도 샀어요.\n4. 그리고 [물건 3] [수량 + 단위명사]을/를 샀어요.\n5. 모두 합해서 [가격] 원이었어요.",
          "sampleAnswer": "저는 어제 백화점에서 쇼핑을 했어요. 따뜻한 셔츠 한 벌을 샀어요. 운동화 한 켤레도 샀어요. 그리고 재미있는 한국어 소설책 두 권을 샀어요. 모두 합해서 팔만 오천 원이었어요."
        }
      }
    ]
  },
  {
    "id": "unit-7",
    "unitNum": 7,
    "partId": "B",
    "partName": "Part B: Everyday Needs",
    "title": "Daily Activities",
    "koreanTitle": "일상생활과 동사",
    "overview": "Conjugate basic Korean verbs in the informal polite present tense (아요/어요/해요) and clearly differentiate destination particle 에 from dynamic action particle 에서.",
    "lessons": [
      {
        "id": "lesson-7-1",
        "code": "7.1",
        "title": "Talking About Daily Actions",
        "koreanTitle": "한국어 공부해요: 아요/어요/해요",
        "situation": "Master present tense verb conjugation based on stem vowel harmony (bright vowels ㅏ/ㅗ vs dark vowels ㅓ/ㅜ/ㅡ/ㅣ and 하다 verbs).",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "The informal polite ending -아요/어요/해요 (해요체) is the most versatile and widespread speech style in modern Korea. It serves equally as declarative (\"I study\"), interrogative (\"Do you study?\"), imperative (\"Please study\"), and propositive (\"Let's study\"), distinguished entirely by conversational intonation.",
        "dialogue": [
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "사라 씨, 지금 뭐 해요?",
            "english": "Sarah, what are you doing right now?",
            "notes": "뭐 해요? = \"What are you doing?\""
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "방에서 한국어 단어를 공부해요. 민수 씨는요?",
            "english": "I am studying Korean vocabulary in my room. How about you, Min-su?",
            "notes": "공부해요 = 공부하다 conjugated; 민수 씨는요? = \"How about Min-su?\""
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "저는 거실에서 음악을 들어요. 그리고 커피를 마셔요.",
            "english": "I am listening to music in the living room. And I am drinking coffee.",
            "notes": "들어요 = 듣다 irregular verb (ㄷ -> ㄹ); 마셔요 = 마시다 (ㅣ + 어 -> 여)."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "오늘 저녁에 같이 밥 먹어요!",
            "english": "Let's eat dinner together this evening!",
            "notes": "밥 먹어요 = \"Let's eat / I eat rice/meal\"."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "좋아요! 여섯 시에 학생식당에서 만나요.",
            "english": "Sounds great! Let's meet at 6 o'clock at the student cafeteria.",
            "notes": "만나요 = 만나다 (ㅏ + 아 -> 아)."
          }
        ],
        "vocabulary": [
          {
            "id": "v7-1-1",
            "korean": "공부하다 / 공부해요",
            "hanja": "工夫",
            "romanization": "gongbuhada / gongbuhaeyo",
            "partOfSpeech": "Verb",
            "english": "to study",
            "exampleKorean": "매일 한국어를 세 시간 공부해요.",
            "exampleEnglish": "I study Korean for three hours every day."
          },
          {
            "id": "v7-1-2",
            "korean": "먹다 / 먹어요",
            "romanization": "meokda / meogeoyo",
            "partOfSpeech": "Verb",
            "english": "to eat",
            "exampleKorean": "아침에 사과를 먹어요.",
            "exampleEnglish": "I eat an apple in the morning."
          },
          {
            "id": "v7-1-3",
            "korean": "마시다 / 마셔요",
            "romanization": "masida / masyeoyo",
            "partOfSpeech": "Verb",
            "english": "to drink",
            "exampleKorean": "시원한 물을 마셔요.",
            "exampleEnglish": "I drink cold water."
          },
          {
            "id": "v7-1-4",
            "korean": "자다 / 자요",
            "romanization": "jada / jayo",
            "partOfSpeech": "Verb",
            "english": "to sleep",
            "exampleKorean": "밤 열한 시에 자요.",
            "exampleEnglish": "I sleep at 11 o'clock at night."
          },
          {
            "id": "v7-1-5",
            "korean": "읽다 / 읽어요",
            "romanization": "ikda / ilgeoyo",
            "partOfSpeech": "Verb",
            "english": "to read",
            "exampleKorean": "도서관에서 책을 읽어요.",
            "exampleEnglish": "I read a book at the library."
          },
          {
            "id": "v7-1-6",
            "korean": "일하다 / 일해요",
            "romanization": "ilhada / ilhaeyo",
            "partOfSpeech": "Verb",
            "english": "to work",
            "exampleKorean": "회사에서 열심히 일해요.",
            "exampleEnglish": "I work diligently at the company."
          },
          {
            "id": "v7-1-7",
            "korean": "만나다 / 만나요",
            "romanization": "mannada / mannayo",
            "partOfSpeech": "Verb",
            "english": "to meet",
            "exampleKorean": "주말에 친구를 만나요.",
            "exampleEnglish": "I meet a friend on the weekend."
          }
        ],
        "grammar": [
          {
            "id": "g7-1-1",
            "pattern": "Verb Stem + 아요 / 어요 / 해요 (Present Polite Informal)",
            "englishMeaning": "do / does / am doing",
            "formula": "Stem vowel ㅏ, ㅗ -> + 아요 | Other vowels (ㅓ, ㅜ, ㅡ, ㅣ) -> + 어요 | -하다 -> 해요",
            "explanation": "To conjugate a Korean verb into the polite informal style (해요체), drop 다 from the dictionary form and inspect the last vowel of the stem.",
            "rules": [
              "1. Bright Vowel (ㅏ, ㅗ): Attach -아요.\n   - 가다 -> 가 + 아요 = 가요 (contracted)\n   - 보다 -> 보 + 아요 = 봐요 (contracted)\n   - 살다 -> 살 + 아요 = 살아요",
              "2. Dark/Neutral Vowel (ㅓ, ㅜ, ㅡ, ㅣ): Attach -어요.\n   - 먹다 -> 먹 + 어요 = 먹어요\n   - 마시다 -> 마시 + 어요 = 마셔요 (contracted)\n   - 쓰다 -> 쓰 + 어요 = 써요 (ㅡ deleted)",
              "3. -하다 Verbs: Always become 해요.\n   - 공부하다 -> 공부해요\n   - 운동하다 -> 운동해요\n   - 일하다 -> 일해요"
            ],
            "examples": [
              {
                "korean": "저는 매일 도서관에서 책을 읽어요.",
                "english": "I read books at the library every day.",
                "breakdown": "읽 (stem ending in ㅣ) + 어요 -> 읽어요"
              },
              {
                "korean": "친구와 함께 공원에서 운동해요.",
                "english": "I exercise in the park together with a friend.",
                "breakdown": "운동하 (하다 stem) -> 운동해요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d7-1",
          "title": "Present Tense Conjugation Drills (동사 활용 연습)",
          "instruction": "Conjugate each dictionary form verb into the polite present tense ending.",
          "drills": [
            {
              "prompt": "Conjugate: 보다 (to see/watch) -> [I watch television].",
              "targetKorean": "텔레비전을 봐요.",
              "english": "I watch television.",
              "audioText": "텔레비전을 봐요"
            },
            {
              "prompt": "Conjugate: 마시다 (to drink) -> [I drink water].",
              "targetKorean": "물을 마셔요.",
              "english": "I drink water.",
              "audioText": "물을 마셔요"
            },
            {
              "prompt": "Conjugate: 먹다 (to eat) -> [I eat breakfast].",
              "targetKorean": "아침밥을 먹어요.",
              "english": "I eat breakfast.",
              "audioText": "아침밥을 먹어요"
            },
            {
              "prompt": "Conjugate: 공부하다 (to study) -> [I study Korean].",
              "targetKorean": "한국어를 공부해요.",
              "english": "I study Korean.",
              "audioText": "한국어를 공부해요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw7-1",
          "readingTitle": "사라의 하루 일과 (Sarah's Daily Routine)",
          "readingPassage": "저는 아침 일곱 시에 일어나요. 먼저 물을 한 잔 마셔요. 그리고 여덟 시에 아침밥을 먹어요. 오전 아홉 시에 대학교에 가요. 교실에서 한국어를 열심히 공부해요. 오후 한 시에 친구와 함께 점심을 먹어요. 저녁에는 방에서 음악을 듣고 숙제를 해요.",
          "readingTranslation": "I wake up at 7 o'clock in the morning. First, I drink a glass of water. And at 8 o'clock, I eat breakfast. At 9 AM, I go to university. In the classroom, I study Korean diligently. At 1 PM, I eat lunch together with a friend. In the evening, I listen to music and do homework in my room.",
          "comprehensionQuestions": [
            {
              "question": "What time does Sarah wake up?",
              "answer": "아침 7시 (7 AM)",
              "explanation": "아침 일곱 시에 일어나요."
            },
            {
              "question": "What does Sarah do in the evening?",
              "answer": "음악을 듣고 숙제를 해요 (Listens to music and does homework)",
              "explanation": "저녁에는 방에서 음악을 듣고 숙제를 해요."
            }
          ],
          "writingPrompt": "Write 6 sentences describing your daily routine using present tense verbs (일어나요, 먹어요, 공부해요, 운동해요, 자요).",
          "writingTemplate": "1. 저는 아침 [시간]에 일어나요.\n2. 아침에 [음식/음료]을/를 먹어요.\n3. 낮에 [장소]에서 [활동]해요.\n4. 오후에 친구를 만나요.\n5. 저녁에 집에서 [활동]을/를 해요.\n6. 밤 [시간]에 자요.",
          "sampleAnswer": "저는 아침 일곱 시 반에 일어나요. 아침에 커피와 빵을 먹어요. 낮에 도서관에서 한국어를 열심히 공부해요. 오후에 카페에서 친구를 만나요. 저녁에 집에서 영화를 봐요. 밤 열두 시에 자요."
        }
      },
      {
        "id": "lesson-7-2",
        "code": "7.2",
        "title": "Where You Do Things",
        "koreanTitle": "에 가요 vs 에서 공부해요",
        "situation": "Distinguish destination particle -에 (movement with 가요/와요) from dynamic action location particle -에서.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "The distinction between \"에\" and \"에서\" is one of the most critical structural rules in Korean. Use \"에\" with directional movement verbs (가다, 오다, 다니다) and static existence (있다, 없다, 살다). Use \"에서\" whenever an active physical or mental action (먹다, 공부하다, 운동하다, 일하다, 사다) happens at that location.",
        "dialogue": [
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "민수 씨, 지금 어디에 가요?",
            "english": "Min-su, where are you going right now?",
            "notes": "어디에 가요 = Directional movement to a destination."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "저는 중앙도서관에 가요. 사라 씨를 만나요.",
            "english": "I am going to the Central Library. I am meeting Sarah.",
            "notes": "중앙도서관에 가요 = Going TO the library."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "도서관에서 무엇을 해요?",
            "english": "What are you doing at the library?",
            "notes": "도서관에서 = Dynamic action taking place AT the library."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "도서관에서 한국어 시험공부를 해요. 데이비드 씨도 같이 갈래요?",
            "english": "We are studying for the Korean exam at the library. David, would you like to come along too?",
            "notes": "시험공부 = exam study; 같이 갈래요? = \"Would you like to go together?\""
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "좋아요! 저도 도서관에서 책을 빌려요.",
            "english": "Great! I will borrow a book at the library too.",
            "notes": "빌려요 = 빌리다 (to borrow)."
          }
        ],
        "vocabulary": [
          {
            "id": "v7-2-1",
            "korean": "도서관",
            "hanja": "圖書館",
            "romanization": "doseogwan",
            "partOfSpeech": "Noun",
            "english": "library",
            "exampleKorean": "도서관에서 조용히 공부해요.",
            "exampleEnglish": "I study quietly at the library."
          },
          {
            "id": "v7-2-2",
            "korean": "학교",
            "hanja": "學校",
            "romanization": "hakgyo",
            "partOfSpeech": "Noun",
            "english": "school",
            "exampleKorean": "아침마다 학교에 가요.",
            "exampleEnglish": "I go to school every morning."
          },
          {
            "id": "v7-2-3",
            "korean": "식당",
            "hanja": "食堂",
            "romanization": "sikdang",
            "partOfSpeech": "Noun",
            "english": "restaurant / cafeteria",
            "exampleKorean": "학생 식당에서 점심을 먹어요.",
            "exampleEnglish": "I eat lunch at the student cafeteria."
          },
          {
            "id": "v7-2-4",
            "korean": "회사",
            "hanja": "會社",
            "romanization": "hoesa",
            "partOfSpeech": "Noun",
            "english": "company / workplace",
            "exampleKorean": "아버지께서 회사에서 일하세요.",
            "exampleEnglish": "My father works at a company."
          },
          {
            "id": "v7-2-5",
            "korean": "가다 / 가요",
            "romanization": "gada / gayo",
            "partOfSpeech": "Verb",
            "english": "to go",
            "exampleKorean": "지금 공항에 가요.",
            "exampleEnglish": "I am going to the airport right now."
          },
          {
            "id": "v7-2-6",
            "korean": "오다 / 와요",
            "romanization": "oda / wayo",
            "partOfSpeech": "Verb",
            "english": "to come",
            "exampleKorean": "친구가 한국에 와요.",
            "exampleEnglish": "My friend comes to Korea."
          }
        ],
        "grammar": [
          {
            "id": "g7-2-1",
            "pattern": "Place + 에 가다/오다 (Destination) vs Place + 에서 Action Verb (Dynamic Location)",
            "englishMeaning": "to go TO a place vs do an action AT a place",
            "formula": "[Destination Place] + 에 + 가요/와요 | [Action Place] + 에서 + [Action Verb]",
            "explanation": "Never use 에서 with 가다/오다 when stating where you are traveling to; use 에. Conversely, never use 에 when performing a dynamic activity like eating or buying; use 에서.",
            "rules": [
              "학교에 가요 (O) -> Going TO school",
              "학교에서 가요 (X - unless departing from school)",
              "식당에서 밥을 먹어요 (O) -> Eating AT the restaurant",
              "식당에 밥을 먹어요 (X - incorrect particle)"
            ],
            "examples": [
              {
                "korean": "저는 매일 카페에 가요. 그리고 카페에서 공부해요.",
                "english": "I go to the cafe every day. And I study at the cafe.",
                "breakdown": "카페에 가요 (Destination 에) -> 카페에서 공부해요 (Action location 에서)"
              },
              {
                "korean": "백화점에서 옷을 사요.",
                "english": "I buy clothes at the department store.",
                "breakdown": "백화점 (dept store) + 에서 (at) + 옷 (clothes) + 을 + 사요 (buy)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d7-2",
          "title": "Particle Contrast Drills: 에 vs 에서 (조사 구분 연습)",
          "instruction": "Choose whether to supply -에 or -에서 in each situational prompt.",
          "drills": [
            {
              "prompt": "I go TO school every day.",
              "targetKorean": "저는 매일 학교에 가요.",
              "english": "I go to school every day.",
              "audioText": "저는 매일 학교에 가요"
            },
            {
              "prompt": "I study Korean AT the library.",
              "targetKorean": "도서관에서 한국어를 공부해요.",
              "english": "I study Korean at the library.",
              "audioText": "도서관에서 한국어를 공부해요"
            },
            {
              "prompt": "I meet my friend AT the cafe.",
              "targetKorean": "카페에서 친구를 만나요.",
              "english": "I meet my friend at the cafe.",
              "audioText": "카페에서 친구를 만나요"
            },
            {
              "prompt": "My parents come TO Korea.",
              "targetKorean": "부모님이 한국에 와요.",
              "english": "My parents come to Korea.",
              "audioText": "부모님이 한국에 와요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw7-2",
          "readingTitle": "어디에서 무엇을 해요? (Where Do You Do What?)",
          "readingPassage": "사람들은 주말에 여러 장소에 가요. 학생들은 도서관에서 책을 읽고 시험공부를 해요. 직장인들은 공원에서 산책하고 운동해요. 어떤 사람들은 백화점에서 옷과 신발을 사요. 그리고 저녁에는 맛있는 식당에서 가족과 함께 식사해요.",
          "readingTranslation": "People go to various places on weekends. Students read books and study for exams at the library. Office workers take walks and exercise in the park. Some people buy clothes and shoes at the department store. And in the evening, they dine together with their family at delicious restaurants.",
          "comprehensionQuestions": [
            {
              "question": "What do students do at the library on weekends?",
              "answer": "책을 읽고 시험공부를 해요 (Read books and study for exams)",
              "explanation": "학생들은 도서관에서 책을 읽고 시험공부를 해요."
            },
            {
              "question": "Where do people buy clothes and shoes?",
              "answer": "백화점에서 (At the department store)",
              "explanation": "어떤 사람들은 백화점에서 옷과 신발을 사요."
            }
          ],
          "writingPrompt": "Write 5 sentences detailing where you go on weekends and what specific action you do at each location using 에 and 에서.",
          "writingTemplate": "1. 저는 주말에 [장소 1]에 가요.\n2. [장소 1]에서 [활동 1]을/를 해요.\n3. 그리고 [장소 2]에도 가요.\n4. [장소 2]에서 친구와 함께 [활동 2]을/를 해요.\n5. 저녁에는 집에 와요.",
          "sampleAnswer": "저는 주말에 대형 서점에 가요. 서점에서 한국어 소설을 읽어요. 그리고 자주 가는 카페에도 가요. 카페에서 친구와 함께 시원한 커피를 마셔요. 저녁에는 편안하게 집에 와요."
        }
      }
    ]
  },
  {
    "id": "unit-8",
    "unitNum": 8,
    "partId": "B",
    "partName": "Part B: Everyday Needs",
    "title": "Family and People",
    "koreanTitle": "가족과 사람들",
    "overview": "Introduce family members with accurate familial titles, describe appearance and personality using Korean adjectives, and express negation with 안.",
    "lessons": [
      {
        "id": "lesson-8-1",
        "code": "8.1",
        "title": "Introducing Your Family",
        "koreanTitle": "우리 가족을 소개합니다",
        "situation": "Name family relationships and introduce family members politely using honorific vocabulary (부모님, 아버지, 어머니) and 우리.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korean culture, communal solidarity means you rarely say \"내 가족\" (my family) or \"내 집\" (my house). Instead, always use \"우리 가족\" (our family), \"우리 집\" (our house), and \"우리 나라\" (our country). Furthermore, when referring to someone else's parents or your own elders respectfully, use \"아버지\" (father), \"어머니\" (mother), and \"부모님\" (parents).",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "민수 씨, 가족사진이에요? 가족이 몇 명이에요?",
            "english": "Min-su, is this a family photo? How many people are in your family?",
            "notes": "가족이 몇 명이에요? = \"How many members in family?\"; 명 = counter for people."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "우리 가족은 모두 네 명이에요. 아버지, 어머니, 여동생, 그리고 저예요.",
            "english": "Our family has four people in total. Father, mother, younger sister, and me.",
            "notes": "우리 = \"our/my\" (Koreans say 우리 가족, 우리 집, 우리 학교)."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "여동생이 정말 귀여워요! 학생이에요?",
            "english": "Your younger sister is really cute! Is she a student?",
            "notes": "귀여워요 = 귀엽다 (cute, irregular ㅂ -> 워)."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "네, 고등학생이에요. 부모님은 부산에 사세요.",
            "english": "Yes, she is a high school student. My parents live in Busan.",
            "notes": "사세요 = 살다 with honorific -(으)시-."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "아, 그러시군요! 아주 화목한 가족이에요.",
            "english": "Ah, I see! It is a very warm and harmonious family.",
            "notes": "그러시군요 = Polite sympathetic reaction."
          }
        ],
        "vocabulary": [
          {
            "id": "v8-1-1",
            "korean": "가족",
            "hanja": "家族",
            "romanization": "gajok",
            "partOfSpeech": "Noun",
            "english": "family",
            "exampleKorean": "우리 가족은 서울에 살아요.",
            "exampleEnglish": "Our family lives in Seoul."
          },
          {
            "id": "v8-1-2",
            "korean": "부모님",
            "hanja": "父母님",
            "romanization": "bumonim",
            "partOfSpeech": "Noun",
            "english": "parents (respectful)",
            "exampleKorean": "부모님께 편지를 써요.",
            "exampleEnglish": "I write a letter to my parents."
          },
          {
            "id": "v8-1-3",
            "korean": "아버지 / 어머니",
            "romanization": "abeoji / eomeoni",
            "partOfSpeech": "Noun",
            "english": "father / mother",
            "exampleKorean": "아버지는 회사원이고 어머니는 선생님이세요.",
            "exampleEnglish": "My father is an office worker and my mother is a teacher."
          },
          {
            "id": "v8-1-4",
            "korean": "형 / 오빠",
            "romanization": "hyeong / oppa",
            "partOfSpeech": "Noun",
            "english": "older brother (male speaker: 형 / female speaker: 오빠)",
            "exampleKorean": "우리 형은 키가 커요.",
            "exampleEnglish": "My older brother is tall."
          },
          {
            "id": "v8-1-5",
            "korean": "누나 / 언니",
            "romanization": "nuna / eonni",
            "partOfSpeech": "Noun",
            "english": "older sister (male speaker: 누나 / female speaker: 언니)",
            "exampleKorean": "우리 언니는 요리를 잘해요.",
            "exampleEnglish": "My older sister is good at cooking."
          },
          {
            "id": "v8-1-6",
            "korean": "남동생 / 여동생",
            "romanization": "namdongsaeng / yeodongsaeng",
            "partOfSpeech": "Noun",
            "english": "younger brother / younger sister",
            "exampleKorean": "여동생은 지금 중학생이에요.",
            "exampleEnglish": "My younger sister is currently a middle school student."
          },
          {
            "id": "v8-1-7",
            "korean": "명",
            "hanja": "名",
            "romanization": "myeong",
            "partOfSpeech": "Counter",
            "english": "counter for people",
            "exampleKorean": "학생 세 명과 선생님 한 분",
            "exampleEnglish": "Three students and one teacher (honorific 분)"
          }
        ],
        "grammar": [
          {
            "id": "g8-1-1",
            "pattern": "우리 + [가족 / 집 / 학교]",
            "englishMeaning": "Our / My (collective possessive pronoun)",
            "formula": "우리 + [Group/Shared Noun]",
            "explanation": "Although literally meaning \"we/our\", Korean speakers use 우리 where English speakers would naturally say \"my\", reflecting the collective and relational cultural mindset.",
            "rules": [
              "Always use 우리 with family: 우리 아버지, 우리 어머니, 우리 가족.",
              "Use with institutions: 우리 학교 (my school), 우리 회사 (my company)."
            ],
            "examples": [
              {
                "korean": "우리 가족은 모두 네 명이에요.",
                "english": "My family has four members in total.",
                "breakdown": "우리 (our/my) + 가족 (family) + 은 + 모두 (all) + 네 명 (4 people) + 이에요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d8-1",
          "title": "Family Introduction Drills (가족 소개 연습)",
          "instruction": "State the members and count of your family clearly.",
          "drills": [
            {
              "prompt": "Ask: How many people are in your family?",
              "targetKorean": "가족이 몇 명이에요?",
              "english": "How many people are in your family?",
              "audioText": "가족이 몇 명이에요"
            },
            {
              "prompt": "Answer: My family has 3 people (Father, mother, and me).",
              "targetKorean": "우리 가족은 세 명이에요. 아버지, 어머니, 그리고 저예요.",
              "english": "My family has 3 people. Father, mother, and me.",
              "audioText": "우리 가족은 세 명이에요 아버지 어머니 그리고 저예요"
            },
            {
              "prompt": "State: I have one older sister.",
              "targetKorean": "저는 언니가 한 명 있어요.",
              "english": "I have one older sister.",
              "audioText": "저는 언니가 한 명 있어요"
            },
            {
              "prompt": "State: I do not have a younger sibling.",
              "targetKorean": "동생은 없어요.",
              "english": "I do not have a younger sibling.",
              "audioText": "동생은 없어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw8-1",
          "readingTitle": "민수의 가족 소개 (Minsu's Family Introduction)",
          "readingPassage": "우리 가족을 소개합니다. 우리 가족은 아버지, 어머니, 저, 여동생 모두 네 명입니다. 아버지는 은행원이고 어머니는 중학교 교사이십니다. 여동생은 노래를 아주 잘합니다. 우리는 주말마다 함께 맛있는 음식을 먹고 공원을 산책합니다. 저는 우리 가족을 정말 사랑합니다.",
          "readingTranslation": "Let me introduce our family. Our family has four people: father, mother, myself, and my younger sister. My father is a bank employee and my mother is a middle school teacher. My younger sister sings very well. Every weekend, we eat delicious food together and stroll in the park. I really love my family.",
          "comprehensionQuestions": [
            {
              "question": "What is Minsu's mother's occupation?",
              "answer": "중학교 교사 (Middle school teacher)",
              "explanation": "어머니는 중학교 교사이십니다."
            },
            {
              "question": "What does Minsu's sister do well?",
              "answer": "노래 (Singing)",
              "explanation": "여동생은 노래를 아주 잘합니다."
            }
          ],
          "writingPrompt": "Write a 6-sentence paragraph introducing your family, stating how many members you have, what their occupations are, and where they live.",
          "writingTemplate": "1. 우리 가족을 소개해요.\n2. 우리 가족은 모두 [숫자] 명이에요.\n3. [가족 1], [가족 2], 그리고 저예요.\n4. [가족 1]은/는 [직업]이에요.\n5. [가족 2]은/는 [특징/취미]을/를 잘해요.\n6. 우리 가족은 지금 [도시]에 살아요.",
          "sampleAnswer": "우리 가족을 소개해요. 우리 가족은 모두 네 명이에요. 아버지, 어머니, 남동생, 그리고 저예요. 아버지는 회사원이고 어머니는 요리를 아주 잘하세요. 제 남동생은 대학생이에요. 우리 가족은 지금 서울에 살아요."
        }
      },
      {
        "id": "lesson-8-2",
        "code": "8.2",
        "title": "Describing People and Adjectives",
        "koreanTitle": "사람 묘사와 형용사, 안 부정문",
        "situation": "Describe physical traits and personality using Korean descriptive adjectives and express simple negation with 안.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korean, adjectives function syntactically as \"descriptive verbs\" (형용사). They do not require a separate linking verb \"to be\" (like \"is\" or \"am\" in English). You conjugate 크다 directly into 커요 (\"is tall/big\") and 친절하다 directly into 친절해요 (\"is kind\"). To make simple negatives, simply prefix \"안\" right before the verb or adjective (e.g. 안 바빠요, 안 먹어요).",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Friend",
            "korean": "민수 씨의 친구 지훈 씨는 어떤 사람이에요?",
            "english": "What kind of person is your friend Ji-hoon, Min-su?",
            "notes": "어떤 사람이에요? = \"What kind of person is he?\""
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "지훈이는 키가 아주 커요. 그리고 성격이 정말 친절해요.",
            "english": "Ji-hoon is very tall. And his personality is really kind.",
            "notes": "키가 커요 = tall (키 height + 크다 big); 친절해요 = kind."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Friend",
            "korean": "요즘도 많이 바빠요?",
            "english": "Is he very busy these days too?",
            "notes": "바빠요 = 바쁘다 (busy)."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "아니요, 이번 주는 시험이 끝났어요. 그래서 안 바빠요.",
            "english": "No, exams ended this week. So he is not busy.",
            "notes": "안 바빠요 = 안 + adjective negation (not busy)."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Friend",
            "korean": "잘됐네요! 주말에 다 같이 영화를 봐요.",
            "english": "That's great to hear! Let's all watch a movie together on the weekend.",
            "notes": "잘됐네요 = \"That turned out well / good to hear\"."
          }
        ],
        "vocabulary": [
          {
            "id": "v8-2-1",
            "korean": "크다 / 커요",
            "romanization": "keuda / keoyo",
            "partOfSpeech": "Adjective",
            "english": "to be big / tall (for height: 키가 크다)",
            "exampleKorean": "그 사람은 키가 아주 커요.",
            "exampleEnglish": "That person is very tall."
          },
          {
            "id": "v8-2-2",
            "korean": "작다 / 작아요",
            "romanization": "jakda / jagayo",
            "partOfSpeech": "Adjective",
            "english": "to be small / short (for height: 키가 작다)",
            "exampleKorean": "방이 조금 작아요.",
            "exampleEnglish": "The room is a little small."
          },
          {
            "id": "v8-2-3",
            "korean": "친절하다 / 친절해요",
            "hanja": "親切",
            "romanization": "chinjeolhada / chinjeolhaeyo",
            "partOfSpeech": "Adjective",
            "english": "to be kind / friendly",
            "exampleKorean": "선생님이 아주 친절해요.",
            "exampleEnglish": "The teacher is very kind."
          },
          {
            "id": "v8-2-4",
            "korean": "바쁘다 / 바빠요",
            "romanization": "bappeuda / bappayo",
            "partOfSpeech": "Adjective",
            "english": "to be busy",
            "exampleKorean": "오늘 일이 많아서 바빠요.",
            "exampleEnglish": "I am busy because I have a lot of work today."
          },
          {
            "id": "v8-2-5",
            "korean": "재미있다 / 재미있어요",
            "romanization": "jaemiitda / jaemiisseoyo",
            "partOfSpeech": "Adjective",
            "english": "to be interesting / fun",
            "exampleKorean": "한국어 수업이 정말 재미있어요.",
            "exampleEnglish": "Korean class is really fun."
          },
          {
            "id": "v8-2-6",
            "korean": "안",
            "romanization": "an",
            "partOfSpeech": "Adverb",
            "english": "not (short-form negation adverb)",
            "exampleKorean": "아침밥을 안 먹었어요.",
            "exampleEnglish": "I did not eat breakfast."
          }
        ],
        "grammar": [
          {
            "id": "g8-2-1",
            "pattern": "안 + Verb / Adjective (Short-form Negation)",
            "englishMeaning": "not / does not / is not",
            "formula": "안 + [Inflected Verb or Adjective]",
            "explanation": "Place the adverb 안 directly before the predicate verb or adjective. For noun-하다 verbs (e.g. 공부하다, 운동하다), 안 is placed between the noun and 하다 (공부 안 해요, 운동 안 해요). For adjectives ending in -하다 (친절하다), 안 comes in front: 안 친절해요.",
            "rules": [
              "Adjective: 안 바빠요 (not busy), 안 커요 (not big)",
              "Action verb: 안 가요 (don't go), 안 먹어요 (don't eat)",
              "Noun-하다 action verb: 일 안 해요 (don't work), 공부 안 해요 (don't study)"
            ],
            "examples": [
              {
                "korean": "저는 매운 음식을 안 먹어요.",
                "english": "I do not eat spicy food.",
                "breakdown": "매운 음식 (spicy food) + 을 + 안 (not) + 먹어요 (eat)"
              },
              {
                "korean": "오늘 날씨가 안 추워요.",
                "english": "The weather is not cold today.",
                "breakdown": "날씨 (weather) + 가 + 안 (not) + 추워요 (cold)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d8-2",
          "title": "Adjective & Negation Drills (형용사와 안 부정문 연습)",
          "instruction": "Practice describing people and negating statements promptly.",
          "drills": [
            {
              "prompt": "Describe: Min-su is kind and tall.",
              "targetKorean": "민수 씨는 친절하고 키가 커요.",
              "english": "Min-su is kind and tall.",
              "audioText": "민수 씨는 친절하고 키가 커요"
            },
            {
              "prompt": "Negate: I am not busy today.",
              "targetKorean": "저는 오늘 안 바빠요.",
              "english": "I am not busy today.",
              "audioText": "저는 오늘 안 바빠요"
            },
            {
              "prompt": "Negate: That computer is not expensive.",
              "targetKorean": "그 컴퓨터는 안 비싸요.",
              "english": "That computer is not expensive.",
              "audioText": "그 컴퓨터는 안 비싸요"
            },
            {
              "prompt": "State: Korean study is really interesting.",
              "targetKorean": "한국어 공부가 정말 재미있어요.",
              "english": "Korean study is really interesting.",
              "audioText": "한국어 공부가 정말 재미있어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw8-2",
          "readingTitle": "제장 친한 친구 (My Best Friend)",
          "readingPassage": "제 가장 친한 친구 이름은 김유진입니다. 유진 씨는 키가 작지만 눈이 아주 큽니다. 성격이 매우 밝고 친절합니다. 우리는 주말에 자주 만나서 함께 커피를 마시고 한국어 공부를 합니다. 유진 씨는 노래를 아주 잘합니다. 항상 친구들을 따뜻하게 도와줍니다.",
          "readingTranslation": "My best friend's name is Kim Yu-jin. Yu-jin is short in height, but her eyes are very big. Her personality is very bright and kind. We meet often on weekends, drink coffee together, and study Korean. Yu-jin is very good at singing. She always warmly helps her friends.",
          "comprehensionQuestions": [
            {
              "question": "What is Yu-jin's personality like?",
              "answer": "매우 밝고 친절해요 (Very bright and kind)",
              "explanation": "성격이 매우 밝고 친절합니다."
            },
            {
              "question": "What does the writer do with Yu-jin on weekends?",
              "answer": "커피를 마시고 한국어 공부를 해요 (Drink coffee and study Korean)",
              "explanation": "함께 커피를 마시고 한국어 공부를 합니다."
            }
          ],
          "writingPrompt": "Write 5-6 sentences describing your best friend or classmate's appearance, personality, and whether they are busy.",
          "writingTemplate": "1. 제 친구 이름은 [이름]이에요.\n2. [이름]은/는 키가 [커요 / 작아요].\n3. 성격이 정말 [친절해요 / 밝아요 / 좋아요].\n4. 요즘은 시험 때문에 [바빠요 / 안 바빠요].\n5. 주말에 같이 [활동]을/를 해요.\n6. 아주 좋은 친구예요.",
          "sampleAnswer": "제 친구 이름은 마이클이에요. 마이클은 키가 아주 커요. 성격이 정말 친절하고 재미있어요. 요즘은 아르바이트 때문에 조금 바빠요. 하지만 주말에 같이 축구를 해요. 정말 좋은 친구예요."
        }
      }
    ]
  }
] as unknown as KoreanUnit[]),
// ==========================================
// PART C: TALK ABOUT YOUR LIFE (UNITS 9-13)
// ==========================================
...([
  {
    "id": "unit-9",
    "unitNum": 9,
    "partId": "C",
    "partName": "Part C: Life & Daily Routine",
    "title": "Time and Daily Routine",
    "koreanTitle": "시간과 하루 일과",
    "overview": "Tell the time using Native Korean numbers for hours and Sino-Korean numbers for minutes, state daily routines with time particle 에, and connect sentences with 그리고.",
    "lessons": [
      {
        "id": "lesson-9-1",
        "code": "9.1",
        "title": "Asking When Someone Wakes Up",
        "koreanTitle": "몇 시에 일어나요?",
        "situation": "Master telling time using Native numbers for hours (시) and Sino-Korean numbers for minutes (분), and time marker 에.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Telling time is one of the most famous dual-number quirks in Korean. Hours (시) use Native Korean numbers (한 시, 두 시, 세 시...), while minutes (분) use Sino-Korean numbers (일 분, 십 분, 삼십 분). For 30 minutes, Koreans frequently substitute the word \"반\" (half), as in \"일곱 시 반\" (7:30).",
        "dialogue": [
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "사라 씨, 보통 아침 몇 시에 일어나요?",
            "english": "Sarah, what time do you usually wake up in the morning?",
            "notes": "보통 = usually; 몇 시에 = at what time."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "저는 일곱 시 반에 일어나요. 민수 씨는요?",
            "english": "I wake up at 7:30. How about you, Min-su?",
            "notes": "반 = half (30 minutes); 일곱 시 = Native 7 + 시."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "저는 여덟 시 십 분에 일어나요. 그리고 아홉 시에 수업이 시작돼요.",
            "english": "I wake up at 8:10. And my class starts at 9:00.",
            "notes": "십 분 = Sino-Korean 10 + 분; 시작돼요 = starts."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "수업이 몇 시에 끝나요?",
            "english": "What time does class finish?",
            "notes": "끝나요 = 끝나다 (to finish/end)."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "오후 한 시에 끝나요. 그래서 한 시 반에 점심을 먹어요.",
            "english": "It finishes at 1:00 PM. So I eat lunch at 1:30.",
            "notes": "한 시 = 1:00 (하나 -> 한)."
          }
        ],
        "vocabulary": [
          {
            "id": "v9-1-1",
            "korean": "시 / 분 / 초",
            "hanja": "時 / 分 / 秒",
            "romanization": "si / bun / cho",
            "partOfSpeech": "Counter",
            "english": "hour (o'clock) / minute / second",
            "exampleKorean": "지금은 오후 세 시 십오 분이에요.",
            "exampleEnglish": "It is 3:15 PM right now."
          },
          {
            "id": "v9-1-2",
            "korean": "반",
            "hanja": "半",
            "romanization": "ban",
            "partOfSpeech": "Noun",
            "english": "half / half past (30 minutes)",
            "exampleKorean": "열두 시 반에 만나요.",
            "exampleEnglish": "Let us meet at 12:30."
          },
          {
            "id": "v9-1-3",
            "korean": "오전 / 오후",
            "hanja": "午前 / 午後",
            "romanization": "ojeon / ohu",
            "partOfSpeech": "Noun",
            "english": "AM (morning) / PM (afternoon)",
            "exampleKorean": "오전 아홉 시부터 오후 여섯 시까지 일해요.",
            "exampleEnglish": "I work from 9 AM to 6 PM."
          },
          {
            "id": "v9-1-4",
            "korean": "보통",
            "hanja": "普通",
            "romanization": "botong",
            "partOfSpeech": "Adverb",
            "english": "usually / normally",
            "exampleKorean": "보통 주말에는 푹 쉬어요.",
            "exampleEnglish": "I usually rest deeply on weekends."
          },
          {
            "id": "v9-1-5",
            "korean": "일어나다 / 일어나요",
            "romanization": "ireonada / ireonayo",
            "partOfSpeech": "Verb",
            "english": "to wake up / get up",
            "exampleKorean": "아침 일찍 일어나요.",
            "exampleEnglish": "I get up early in the morning."
          },
          {
            "id": "v9-1-6",
            "korean": "시작하다 / 끝나다",
            "romanization": "sijakhada / kkeutnada",
            "partOfSpeech": "Verb",
            "english": "to start / to finish",
            "exampleKorean": "영화가 여덟 시에 시작하고 열 시에 끝나요.",
            "exampleEnglish": "The movie starts at 8 and ends at 10."
          }
        ],
        "grammar": [
          {
            "id": "g9-1-1",
            "pattern": "Time + 에 (Time Marker)",
            "englishMeaning": "at / on / in (indicating the time of an event)",
            "formula": "[Specific Hour/Minute/Day] + 에",
            "explanation": "Attach -에 to specific clock times, days, and calendar units. Note: -에 is NOT attached to relative time adverbs like 오늘 (today), 어제 (yesterday), 내일 (tomorrow), 지금 (now), or 언제 (when).",
            "rules": [
              "Attach to clock times: 일곱 시에 (at 7 o'clock), 세 시 반에 (at 3:30).",
              "DO NOT attach to: 오늘, 내일, 어제, 지금, 매일 (say 오늘 가요, NOT 오늘에 가요)."
            ],
            "examples": [
              {
                "korean": "저는 밤 열한 시에 자요.",
                "english": "I sleep at 11 o'clock at night.",
                "breakdown": "밤 (night) + 열한 시 (11 o'clock) + 에 (at) + 자요 (sleep)"
              },
              {
                "korean": "내일 세 시에 시험이 있어요.",
                "english": "There is an exam at 3 o'clock tomorrow.",
                "breakdown": "내일 (no 에) + 세 시 (3 o'clock) + 에 (at) + 시험이 있어요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d9-1",
          "title": "Telling Time Drills (시간 묻고 답하기 연습)",
          "instruction": "Practice reciting clock times with the correct hybrid numbering system.",
          "drills": [
            {
              "prompt": "Say the time: 6:00 AM.",
              "targetKorean": "오전 여섯 시예요.",
              "english": "It is 6:00 AM.",
              "audioText": "오전 여섯 시예요"
            },
            {
              "prompt": "Say the time: 2:30 PM.",
              "targetKorean": "오후 두 시 반이에요.",
              "english": "It is 2:30 PM.",
              "audioText": "오후 두 시 반이에요"
            },
            {
              "prompt": "Ask: What time do you eat lunch?",
              "targetKorean": "몇 시에 점심을 먹어요?",
              "english": "What time do you eat lunch?",
              "audioText": "몇 시에 점심을 먹어요"
            },
            {
              "prompt": "Answer: I eat at 12:45.",
              "targetKorean": "열두 시 사십오 분에 먹어요.",
              "english": "I eat at 12:45.",
              "audioText": "열두 시 사십오 분에 먹어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw9-1",
          "readingTitle": "하루 시간표 (Daily Schedule Table)",
          "readingPassage": "김민수의 하루 시간표:\n- 07:00 기상 및 아침 운동\n- 08:00 아침 식사\n- 09:00 - 13:00 대학교 전공 수업\n- 13:00 점심 식사 (학생식당)\n- 14:00 - 17:00 도서관 자습\n- 19:00 저녁 식사 및 휴식\n- 23:30 취침",
          "readingTranslation": "Kim Minsu's Daily Schedule:\n- 07:00 Wake-up and morning exercise\n- 08:00 Breakfast\n- 09:00 - 13:00 University major classes\n- 13:00 Lunch (student cafeteria)\n- 14:00 - 17:00 Library self-study\n- 19:00 Dinner and relaxation\n- 23:30 Bedtime",
          "comprehensionQuestions": [
            {
              "question": "What time does Minsu eat breakfast?",
              "answer": "8:00 AM (여덟 시)",
              "explanation": "08:00 아침 식사"
            },
            {
              "question": "What does Minsu do at 11:30 PM?",
              "answer": "취침 (Goes to sleep - 자요)",
              "explanation": "23:30 취침"
            }
          ],
          "writingPrompt": "Write out your exact daily schedule for 5 key events in full Korean sentences specifying the time with Native hours and Sino-Korean minutes.",
          "writingTemplate": "1. 저는 아침 [시간]에 일어나요.\n2. [시간]에 아침 식사를 해요.\n3. [시간]에 [학교/회사]에 가요.\n4. [시간]에 점심을 먹어요.\n5. 밤 [시간]에 잠을 자요.",
          "sampleAnswer": "1. 저는 아침 일곱 시에 일어나요.\n2. 여덟 시 십 분에 아침 식사를 해요.\n3. 여덟 시 오십 분에 학교에 가요.\n4. 오후 열두 시 반에 점심을 먹어요.\n5. 밤 열한 시 사십오 분에 잠을 자요."
        }
      },
      {
        "id": "lesson-9-2",
        "code": "9.2",
        "title": "Comparing Daily Schedules and Sentences",
        "koreanTitle": "하루 일과와 그리고",
        "situation": "Connect multiple routine actions into cohesive paragraphs using 그리고, frequency adverbs (매일, 자주, 가끔), and time sequence.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Hangang Park (한강공원) in Seoul is the centerpiece of weekend recreational life for university students and residents. Renting a bicycle (따릉이), picnicking on the grass, and eating instant ramen cooked on convenience store machines by the river is a classic weekend ritual.",
        "dialogue": [
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "사라 씨는 주말에 보통 뭐 해요?",
            "english": "Sarah, what do you usually do on the weekend?",
            "notes": "보통 = usually."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "저는 토요일 아침에 빨래를 해요. 그리고 방 청소를 해요.",
            "english": "I do laundry on Saturday morning. And I clean my room.",
            "notes": "빨래를 해요 = do laundry; 청소를 해요 = clean."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "오후에는 운동을 자주 해요?",
            "english": "Do you often exercise in the afternoon?",
            "notes": "자주 = often (frequency adverb)."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "네, 한강 공원에서 자전거를 타요. 그리고 저녁에는 친구와 맛있는 음식을 먹어요.",
            "english": "Yes, I ride a bicycle at Hangang Park. And in the evening, I eat delicious food with a friend.",
            "notes": "자전거를 타요 = ride a bicycle."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "정말 알차고 건강한 주말이네요!",
            "english": "That is truly a productive and healthy weekend!",
            "notes": "알차다 = fruitful/productive."
          }
        ],
        "vocabulary": [
          {
            "id": "v9-2-1",
            "korean": "그리고",
            "romanization": "geurigo",
            "partOfSpeech": "Particle",
            "english": "and / and then (sentence connector)",
            "exampleKorean": "영화를 봤어요. 그리고 밥을 먹었어요.",
            "exampleEnglish": "I watched a movie. And then I ate a meal."
          },
          {
            "id": "v9-2-2",
            "korean": "매일 / 항상",
            "hanja": "每日 / 恒常",
            "romanization": "maeil / hangsang",
            "partOfSpeech": "Adverb",
            "english": "every day / always",
            "exampleKorean": "저는 매일 한국어 단어를 외워요.",
            "exampleEnglish": "I memorize Korean words every day."
          },
          {
            "id": "v9-2-3",
            "korean": "자주 / 가끔",
            "romanization": "jaju / gakkeum",
            "partOfSpeech": "Adverb",
            "english": "often / sometimes",
            "exampleKorean": "카페에 자주 가요. 하지만 술은 가끔 마셔요.",
            "exampleEnglish": "I often go to cafes. But I drink alcohol only sometimes."
          },
          {
            "id": "v9-2-4",
            "korean": "청소하다 / 빨래하다",
            "hanja": "淸掃 / ──",
            "romanization": "cheongsohada / ppallaehada",
            "partOfSpeech": "Verb",
            "english": "to clean / to do laundry",
            "exampleKorean": "토요일마다 집을 청소해요.",
            "exampleEnglish": "I clean the house every Saturday."
          },
          {
            "id": "v9-2-5",
            "korean": "자전거를 타다",
            "romanization": "jajeon-georeul tada",
            "partOfSpeech": "Verb",
            "english": "to ride a bicycle",
            "exampleKorean": "한강에서 자전거를 타요.",
            "exampleEnglish": "I ride a bicycle at the Han River."
          }
        ],
        "grammar": [
          {
            "id": "g9-2-1",
            "pattern": "Sentence 1. 그리고 + Sentence 2.",
            "englishMeaning": "Sentence 1. And / And then Sentence 2.",
            "formula": "[Full Sentence with ending]. 그리고 [Full Sentence with ending].",
            "explanation": "그리고 is placed at the start of a new clause or sentence to link two actions chronologically or conceptually.",
            "rules": [
              "Always end the first sentence completely with a period: 저는 밥을 먹어요. 그리고 커피를 마셔요.",
              "Do not confuse 그리고 (sentence connector) with 하고/와/과 (noun connectors)."
            ],
            "examples": [
              {
                "korean": "아침에 운동을 해요. 그리고 샤워를 해요.",
                "english": "I exercise in the morning. And then I take a shower.",
                "breakdown": "운동을 해요 (exercise) + . + 그리고 (and then) + 샤워를 해요 (shower)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d9-2",
          "title": "Frequency & Sequence Drills (빈도 부사와 그리고 연습)",
          "instruction": "Incorporate frequency adverbs and link two actions using 그리고.",
          "drills": [
            {
              "prompt": "Connect: I study Korean. And I listen to music.",
              "targetKorean": "저는 한국어를 공부해요. 그리고 음악을 들어요.",
              "english": "I study Korean. And I listen to music.",
              "audioText": "저는 한국어를 공부해요 그리고 음악을 들어요"
            },
            {
              "prompt": "State: I exercise every day.",
              "targetKorean": "저는 매일 운동해요.",
              "english": "I exercise every day.",
              "audioText": "저는 매일 운동해요"
            },
            {
              "prompt": "State: I often drink coffee at the cafe.",
              "targetKorean": "카페에서 커피를 자주 마셔요.",
              "english": "I often drink coffee at the cafe.",
              "audioText": "카페에서 커피를 자주 마셔요"
            },
            {
              "prompt": "State: I clean my room on Saturdays. And I do laundry.",
              "targetKorean": "토요일에 방 청소를 해요. 그리고 빨래를 해요.",
              "english": "I clean my room on Saturdays. And I do laundry.",
              "audioText": "토요일에 방 청소를 해요 그리고 빨래를 해요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw9-2",
          "readingTitle": "두 친구의 주말 비교 (Comparing Two Friends' Weekends)",
          "readingPassage": "지훈 씨와 마이클 씨의 주말은 서로 달라요. 지훈 씨는 주말에 집에서 푹 쉬어요. 늦게까지 잠을 자요. 그리고 거실에서 넷플릭스 드라마를 봐요. 하지만 마이클 씨는 주말마다 밖으로 나가요. 북한산에 등산을 가요. 그리고 저녁에는 친구들과 축구를 해요. 두 사람 모두 즐거운 주말을 보내요.",
          "readingTranslation": "Ji-hoon and Michael's weekends are different from each other. Ji-hoon rests deeply at home on weekends. He sleeps until late. And he watches Netflix dramas in the living room. However, Michael goes outside every weekend. He goes hiking at Bukhansan Mountain. And in the evening, he plays soccer with his friends. Both people spend enjoyable weekends.",
          "comprehensionQuestions": [
            {
              "question": "What does Ji-hoon do on weekends?",
              "answer": "집에서 푹 쉬고 드라마를 봐요 (Rests at home and watches dramas)",
              "explanation": "집에서 푹 쉬어요. 그리고 거실에서 넷플릭스 드라마를 봐요."
            },
            {
              "question": "Where does Michael go hiking?",
              "answer": "북한산 (Bukhansan Mountain)",
              "explanation": "북한산에 등산을 가요."
            }
          ],
          "writingPrompt": "Write a 6-sentence paragraph describing your typical Saturday, using 그리고 twice and at least two frequency adverbs (매일, 자주, 보통).",
          "writingTemplate": "1. 저는 토요일에 보통 [시간]에 일어나요.\n2. 아침에 [활동 1]을/를 해요.\n3. 그리고 [활동 2]도 해요.\n4. 오후에는 친구를 자주 만나요.\n5. [장소]에서 함께 [활동 3]을/를 해요.\n6. 그리고 밤에 집으로 돌아와요.",
          "sampleAnswer": "저는 토요일에 보통 아홉 시에 일어나요. 아침에 가볍게 조깅을 해요. 그리고 시원한 물을 마셔요. 오후에는 도서관에서 친구를 자주 만나요. 서점에서 재미있는 책을 함께 읽어요. 그리고 밤 열한 시에 집으로 돌아와요."
        }
      }
    ]
  },
  {
    "id": "unit-10",
    "unitNum": 10,
    "partId": "C",
    "partName": "Part C: Life & Daily Routine",
    "title": "Dates, Days and Appointments",
    "koreanTitle": "날짜와 약속",
    "overview": "Read calendar dates in Sino-Korean numbers, state birthdays, name days of the week, and schedule appointments using 언제 and time particle 에.",
    "lessons": [
      {
        "id": "lesson-10-1",
        "code": "10.1",
        "title": "Asking About Birthdays and Dates",
        "koreanTitle": "생일과 날짜 묻기",
        "situation": "Read full calendar dates using Sino-Korean numbers with 년 (year), 월 (month), and 일 (day), including irregular month pronunciations.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Crucial calendar phonetic rule: While months are numbered 1 to 12 with Sino-Korean digits, month 6 and month 10 lose their final 받침 consonants to ensure smooth pronunciation: 6월 is pronounced and spelled \"유월\" (never 육월), and 10월 is pronounced and spelled \"시월\" (never 십월). In contrast, days of the month (일) keep normal Sino-Korean forms: 1일(일일), 2일(이일)... 31일(삼십일일).",
        "dialogue": [
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "사라 씨, 생일이 언제예요?",
            "english": "Sarah, when is your birthday?",
            "notes": "생일이 언제예요? = \"When is your birthday?\""
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Friend",
            "korean": "제 생일은 10월 24일이에요. 민수 씨 생일은요?",
            "english": "My birthday is October 24th. What about yours, Min-su?",
            "notes": "10월 is pronounced \"시월\" (not 십월); 24일 = 이십사일."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "제 생일은 6월 15일이에요. 다음 달이네요!",
            "english": "My birthday is June 15th. That's next month!",
            "notes": "6월 is pronounced \"유월\" (not 육월)."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Friend",
            "korean": "오늘이 5월 며칠이에요?",
            "english": "What day of May is it today?",
            "notes": "며칠 = \"what date / how many days\"."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "오늘은 5월 18일이에요. 날씨가 참 좋아요.",
            "english": "Today is May 18th. The weather is truly nice.",
            "notes": "5월 18일 = 오월 십팔일."
          }
        ],
        "vocabulary": [
          {
            "id": "v10-1-1",
            "korean": "년 / 월 / 일",
            "hanja": "年 / 月 / 日",
            "romanization": "nyeon / wol / il",
            "partOfSpeech": "Counter",
            "english": "year / month / day",
            "exampleKorean": "2026년 10월 24일",
            "exampleEnglish": "October 24, 2026 (이천이십육년 시월 이십사일)"
          },
          {
            "id": "v10-1-2",
            "korean": "유월 / 시월",
            "romanization": "yuwol / siwol",
            "partOfSpeech": "Noun",
            "english": "June (6월) / October (10월) [irregular pronunciation]",
            "exampleKorean": "유월과 시월에 축제가 열려요.",
            "exampleEnglish": "Festivals are held in June and October."
          },
          {
            "id": "v10-1-3",
            "korean": "생일",
            "hanja": "生日",
            "romanization": "saeng-il",
            "partOfSpeech": "Noun",
            "english": "birthday (honorific: 생신)",
            "exampleKorean": "생일 축하합니다!",
            "exampleEnglish": "Happy Birthday!"
          },
          {
            "id": "v10-1-4",
            "korean": "언제",
            "romanization": "eonje",
            "partOfSpeech": "Noun",
            "english": "when (interrogative pronoun)",
            "exampleKorean": "한국에 언제 왔어요?",
            "exampleEnglish": "When did you come to Korea?"
          },
          {
            "id": "v10-1-5",
            "korean": "며칠",
            "romanization": "myeochil",
            "partOfSpeech": "Noun",
            "english": "what date / how many days",
            "exampleKorean": "오늘이 몇 월 며칠이에요?",
            "exampleEnglish": "What month and date is it today?"
          }
        ],
        "grammar": [
          {
            "id": "g10-1-1",
            "pattern": "Sino-Korean Year + 년, Month + 월, Day + 일",
            "englishMeaning": "Korean Date Format (Year-Month-Day order)",
            "formula": "[Year]년 + [Month]월 + [Day]일 + 이에요/예요",
            "explanation": "Korean dates always progress hierarchically from the largest unit to the smallest: Year -> Month -> Day.",
            "rules": [
              "Year: 2026년 (이천이십육 년)",
              "Month: 1월 (일월), 2월 (이월), 3월 (삼월), 4월 (사월), 5월 (오월), 6월 (유월 *), 7월 (칠월), 8월 (팔월), 9월 (구월), 10월 (시월 *), 11월 (십일월), 12월 (십이월)",
              "Day: 며칠 (what day), 15일 (십오 일)"
            ],
            "examples": [
              {
                "korean": "제 생일은 삼월 십사일이에요.",
                "english": "My birthday is March 14th.",
                "breakdown": "삼월 (March) + 십사일 (14th) + 이에요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d10-1",
          "title": "Calendar Date Reading Drills (날짜 읽기 연습)",
          "instruction": "Read each calendar date aloud in smooth Korean without pausing.",
          "drills": [
            {
              "prompt": "Read date: June 15th.",
              "targetKorean": "유월 십오일이에요.",
              "english": "It is June 15th.",
              "audioText": "유월 십오일이에요"
            },
            {
              "prompt": "Read date: October 24th.",
              "targetKorean": "시월 이십사일이에요.",
              "english": "It is October 24th.",
              "audioText": "시월 이십사일이에요"
            },
            {
              "prompt": "Ask: What month and date is it today?",
              "targetKorean": "오늘이 몇 월 며칠이에요?",
              "english": "What month and date is it today?",
              "audioText": "오늘이 몇 월 며칠이에요"
            },
            {
              "prompt": "Answer: Today is August 15th (National Liberation Day).",
              "targetKorean": "오늘은 팔월 십오일 광복절이에요.",
              "english": "Today is August 15th, National Liberation Day.",
              "audioText": "오늘은 팔월 십오일 광복절이에요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw10-1",
          "readingTitle": "한국의 주요 기념일 (Major Korean National Holidays)",
          "readingPassage": "한국에는 의미 있는 기념일이 많습니다.\n- 삼일절: 3월 1일 (삼월 일일)\n- 어린이날: 5월 5일 (오월 오일)\n- 현충일: 6월 6일 (유월 육일)\n- 광복절: 8월 15일 (팔월 십오일)\n- 한글날: 10월 9일 (시월 구일)\n* 한글날은 세종대왕이 한글을 반포한 날을 기념하는 날입니다.",
          "readingTranslation": "Korea has many meaningful memorial holidays.\n- March 1st Movement Day: March 1st\n- Children's Day: May 5th\n- Memorial Day: June 6th\n- National Liberation Day: August 15th\n- Hangul Day: October 9th\n* Hangul Day is a day commemorating the promulgation of Hangul by King Sejong.",
          "comprehensionQuestions": [
            {
              "question": "When is Hangul Day celebrated in Korea?",
              "answer": "10월 9일 (시월 구일)",
              "explanation": "한글날: 10월 9일 (시월 구일)"
            },
            {
              "question": "What is June 6th in Korea?",
              "answer": "현충일 (Memorial Day)",
              "explanation": "현충일: 6월 6일 (유월 육일)"
            }
          ],
          "writingPrompt": "Write 4 sentences detailing your birthday, the current year and date, and the birthday of one family member or friend in Korean.",
          "writingTemplate": "1. 오늘은 [년]년 [월]월 [일]일이에요.\n2. 제 생일은 [월]월 [일]일이에요.\n3. 제 친구 [이름]의 생일은 [월]월 [일]일이에요.\n4. 우리는 생일에 맛있는 케이크를 먹어요.",
          "sampleAnswer": "오늘은 2026년 10월 24일이에요. 제 생일은 4월 12일이에요. 제 친구 민수의 생일은 6월 15일이에요. 우리는 생일에 맛있는 케이크를 먹어요."
        }
      },
      {
        "id": "lesson-10-2",
        "code": "10.2",
        "title": "Planning a Meeting and Days of the Week",
        "koreanTitle": "요일과 약속 잡기",
        "situation": "Master days of the week (월, 화, 수, 목, 금, 토, 일) and negotiate appointment times and places.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Days of the week in Korean are named after the celestial elements of East Asian philosophy: Moon (월요일 - Monday), Fire/Mars (화요일 - Tuesday), Water/Mercury (수요일 - Wednesday), Wood/Jupiter (목요일 - Thursday), Gold/Venus (금요일 - Friday), Earth/Saturn (토요일 - Saturday), and Sun (일요일 - Sunday). Meeting someone at \"홍대 9번 출구\" or \"강남역 10번 출구\" is standard Seoul youth culture.",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "민수 씨, 이번 주 금요일에 시간 있어요?",
            "english": "Min-su, do you have time this Friday?",
            "notes": "이번 주 = this week; 시간 있어요? = \"Do you have time?\""
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "금요일에는 아르바이트가 있어요. 토요일은 어때요?",
            "english": "On Friday I have a part-time job. How about Saturday?",
            "notes": "아르바이트 = part-time job (from German Arbeit); 토요일은 어때요? = \"How about Saturday?\""
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "토요일 좋아요! 언제 만날까요?",
            "english": "Saturday is good! When shall we meet?",
            "notes": "언제 만날까요? = \"When shall we meet?\""
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "오후 두 시에 홍대입구역 9번 출구에서 만나요.",
            "english": "Let's meet at 2:00 PM at Hongik University Station Exit 9.",
            "notes": "홍대입구역 9번 출구 = Seoul's most famous meeting spot."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "네, 좋아요! 토요일 두 시에 봐요.",
            "english": "Yes, sounds great! See you at two on Saturday.",
            "notes": "두 시에 봐요 = \"See you at two\"."
          }
        ],
        "vocabulary": [
          {
            "id": "v10-2-1",
            "korean": "월요일 / 화요일 / 수요일",
            "hanja": "月 / 火 / 水",
            "romanization": "woryoil / hwayoil / suyoil",
            "partOfSpeech": "Noun",
            "english": "Monday / Tuesday / Wednesday",
            "exampleKorean": "월요일부터 수요일까지 수업이 있어요.",
            "exampleEnglish": "I have classes from Monday to Wednesday."
          },
          {
            "id": "v10-2-2",
            "korean": "목요일 / 금요일",
            "hanja": "木 / 金",
            "romanization": "mogyoil / geumyoil",
            "partOfSpeech": "Noun",
            "english": "Thursday / Friday",
            "exampleKorean": "불타는 금요일 (불금)!",
            "exampleEnglish": "Burning Friday (TGIF)!"
          },
          {
            "id": "v10-2-3",
            "korean": "토요일 / 일요일 / 주말",
            "hanja": "土 / 日 / 週末",
            "romanization": "toyoil / iryoil / jumal",
            "partOfSpeech": "Noun",
            "english": "Saturday / Sunday / weekend",
            "exampleKorean": "주말에 푹 쉬세요.",
            "exampleEnglish": "Have a good rest over the weekend."
          },
          {
            "id": "v10-2-4",
            "korean": "약속",
            "hanja": "約束",
            "romanization": "yaksok",
            "partOfSpeech": "Noun",
            "english": "appointment / plan / promise",
            "exampleKorean": "오늘 저녁에 중요한 약속이 있어요.",
            "exampleEnglish": "I have an important appointment this evening."
          },
          {
            "id": "v10-2-5",
            "korean": "어때요?",
            "romanization": "eottaeyo",
            "partOfSpeech": "Expression",
            "english": "How about...? / How is it?",
            "exampleKorean": "내일 점심 어때요?",
            "exampleEnglish": "How about lunch tomorrow?"
          }
        ],
        "grammar": [
          {
            "id": "g10-2-1",
            "pattern": "Day + 요일에 (On [Day])",
            "englishMeaning": "on Monday, on Sunday, etc.",
            "formula": "[Day of Week] + 에",
            "explanation": "Attach the time particle -에 to days of the week to state when an activity occurs.",
            "rules": [
              "월요일에 만나요 (Let's meet on Monday)",
              "주말에 쉬어요 (I rest on the weekend)"
            ],
            "examples": [
              {
                "korean": "우리는 수요일 오후에 한국어를 공부해요.",
                "english": "We study Korean on Wednesday afternoons.",
                "breakdown": "수요일 (Wednesday) + 오후 (afternoon) + 에 (on) + 공부해요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d10-2",
          "title": "Appointment Negotiation Drills (약속 잡기 연습)",
          "instruction": "Propose and accept meeting times using days of the week and 어때요.",
          "drills": [
            {
              "prompt": "Ask: Do you have time on Thursday?",
              "targetKorean": "목요일에 시간 있어요?",
              "english": "Do you have time on Thursday?",
              "audioText": "목요일에 시간 있어요"
            },
            {
              "prompt": "Propose: How about Saturday at 3 PM?",
              "targetKorean": "토요일 오후 세 시 어때요?",
              "english": "How about Saturday at 3 PM?",
              "audioText": "토요일 오후 세 시 어때요"
            },
            {
              "prompt": "Accept: Sounds great! Let's meet in front of the station.",
              "targetKorean": "좋아요! 역 앞에서 만나요.",
              "english": "Sounds great! Let's meet in front of the station.",
              "audioText": "좋아요 역 앞에서 만나요"
            },
            {
              "prompt": "State: I have an appointment on Friday evening.",
              "targetKorean": "금요일 저녁에 약속이 있어요.",
              "english": "I have an appointment on Friday evening.",
              "audioText": "금요일 저녁에 약속이 있어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw10-2",
          "readingTitle": "카카오톡 약속 메시지 (KakaoTalk Appointment Chat)",
          "readingPassage": "사라: 민수 씨, 이번 주말에 약속 있어요?\n민수: 토요일에는 동아리 모임이 있어요. 하지만 일요일에는 시간 있어요.\n사라: 잘됐네요! 일요일 점심에 같이 비빔밥 먹을까요?\n민수: 좋아요! 일요일 열두 시에 신촌역 3번 출구에서 만나요.\n사라: 네, 일요일에 봐요!",
          "readingTranslation": "Sarah: Minsu, do you have plans this weekend?\nMinsu: On Saturday, I have a university club meeting. But on Sunday, I have time.\nSarah: That's great! Shall we eat bibimbap together for lunch on Sunday?\nMinsu: Great! Let's meet at 12 o'clock on Sunday at Sinchon Station Exit 3.\nSarah: Yes, see you on Sunday!",
          "comprehensionQuestions": [
            {
              "question": "Why can't Minsu meet on Saturday?",
              "answer": "동아리 모임이 있어요 (He has a club meeting)",
              "explanation": "토요일에는 동아리 모임이 있어요."
            },
            {
              "question": "Where and when are they meeting?",
              "answer": "일요일 12시 신촌역 3번 출구 (Sunday 12:00 at Sinchon Station Exit 3)",
              "explanation": "일요일 열두 시에 신촌역 3번 출구에서 만나요."
            }
          ],
          "writingPrompt": "Write a realistic 5-line KakaoTalk chat message inviting a friend to hang out on a specific day of the week, setting a time and landmark.",
          "writingTemplate": "1. [이름] 씨, [요일]에 시간 있어요?\n2. [상대방]: 네, [요일]에는 괜찮아요. 왜요?\n3. 우리 같이 [장소]에서 [활동]해요.\n4. [상대방]: 좋아요! 몇 시에 어디에서 만날까요?\n5. [시간]에 [랜드마크]에서 만나요.",
          "sampleAnswer": "사라: 지훈 씨, 이번 주 토요일에 시간 있어요?\n지훈: 네, 토요일에는 약속이 없어요. 왜요?\n사라: 우리 같이 코엑스에서 영화 봐요.\n지훈: 좋아요! 몇 시에 어디에서 만날까요?\n사라: 오후 두 시에 삼성역 개찰구 앞에서 만나요."
        }
      }
    ]
  },
  {
    "id": "unit-11",
    "unitNum": 11,
    "partId": "C",
    "partName": "Part C: Life & Daily Routine",
    "title": "Hobbies and Preferences",
    "koreanTitle": "취미와 선호",
    "overview": "Discuss personal hobbies, express preferences with 좋아하다/싫어하다 and direct objects, formulate desires using -고 싶어요, and contrast ideas using 하지만.",
    "lessons": [
      {
        "id": "lesson-11-1",
        "code": "11.1",
        "title": "Asking About Hobbies and Preferences",
        "koreanTitle": "취미와 좋아하다/싫어하다",
        "situation": "Express likes and dislikes with 좋아해요 and 싫어해요 paired with the object particle 을/를.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Be careful of the critical distinction in Korean between the adjective 좋다 (to be good) and the transitive verb 좋아하다 (to like). When expressing what you like, use the object particle: [Noun]을/를 좋아해요. If you use 좋다, you must use the subject particle: [Noun]이/가 좋아요 (literally \"Noun is good to me\").",
        "dialogue": [
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "사라 씨는 취미가 뭐예요?",
            "english": "Sarah, what is your hobby?",
            "notes": "취미 = hobby."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "제 취미는 음악 감상과 여행이에요. 데이비드 씨는요?",
            "english": "My hobbies are listening to music and traveling. What about you, David?",
            "notes": "음악 감상 = music appreciation; 여행 = travel."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "저는 운동을 정말 좋아해요. 주말마다 축구를 해요.",
            "english": "I really like sports. I play soccer every weekend.",
            "notes": "운동을 좋아해요 = Object particle 을 + 좋아해요."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "매운 음식도 좋아해요? 떡볶이 어때요?",
            "english": "Do you also like spicy food? How about tteokbokki?",
            "notes": "떡볶이 = spicy stir-fried rice cakes."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "아, 저는 매운 음식을 조금 싫어해요. 하지만 불고기는 아주 좋아해요.",
            "english": "Ah, I dislike spicy food a little. But I like bulgogi very much.",
            "notes": "싫어해요 = dislike; 하지만 = \"however / but\"."
          }
        ],
        "vocabulary": [
          {
            "id": "v11-1-1",
            "korean": "취미",
            "hanja": "趣味",
            "romanization": "chwimi",
            "partOfSpeech": "Noun",
            "english": "hobby",
            "exampleKorean": "취미가 뭐예요?",
            "exampleEnglish": "What is your hobby?"
          },
          {
            "id": "v11-1-2",
            "korean": "좋아하다 / 좋아해요",
            "romanization": "joahada / joahaeyo",
            "partOfSpeech": "Verb",
            "english": "to like (takes 을/를)",
            "exampleKorean": "저는 케이팝 음악을 좋아해요.",
            "exampleEnglish": "I like K-pop music."
          },
          {
            "id": "v11-1-3",
            "korean": "싫어하다 / 싫어해요",
            "romanization": "sireohada / sireohaeyo",
            "partOfSpeech": "Verb",
            "english": "to dislike / hate (takes 을/를)",
            "exampleKorean": "비 오는 날을 싫어해요.",
            "exampleEnglish": "I dislike rainy days."
          },
          {
            "id": "v11-1-4",
            "korean": "음악 / 영화 / 독서",
            "hanja": "音樂 / 映畵 / 讀書",
            "romanization": "eum-ak / yeonghwa / dokseo",
            "partOfSpeech": "Noun",
            "english": "music / movies / reading books",
            "exampleKorean": "주말에 영화를 봐요.",
            "exampleEnglish": "I watch movies on the weekend."
          },
          {
            "id": "v11-1-5",
            "korean": "여행 / 운동 / 등산",
            "hanja": "旅行 / 運動 / 登山",
            "romanization": "yeohaeng / undong / deungsan",
            "partOfSpeech": "Noun",
            "english": "travel / exercise (sports) / mountain hiking",
            "exampleKorean": "가을에 등산을 가요.",
            "exampleEnglish": "I go hiking in autumn."
          }
        ],
        "grammar": [
          {
            "id": "g11-1-1",
            "pattern": "Noun + 을/를 좋아하다 / 싫어하다",
            "englishMeaning": "to like / to dislike [Noun]",
            "formula": "[Noun] + 을/를 + 좋아해요 / 싫어해요",
            "explanation": "Always pair 좋아하다 and 싫어하다 with the object particles 을/를 because they are active transitive verbs.",
            "rules": [
              "커피를 좋아해요 (I like coffee)",
              "야채를 싫어해요 (I dislike vegetables)"
            ],
            "examples": [
              {
                "korean": "저는 한국 영화를 정말 좋아해요.",
                "english": "I really like Korean movies.",
                "breakdown": "한국 영화 (Korean movies) + 를 (object) + 정말 (really) + 좋아해요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d11-1",
          "title": "Hobby & Preference Drills (취미와 선호 연습)",
          "instruction": "State what hobbies and foods you like and dislike using 을/를 좋아해요/싫어해요.",
          "drills": [
            {
              "prompt": "State: I like listening to music.",
              "targetKorean": "저는 음악을 좋아해요.",
              "english": "I like music.",
              "audioText": "저는 음악을 좋아해요"
            },
            {
              "prompt": "State: I dislike cold winter.",
              "targetKorean": "저는 추운 겨울을 싫어해요.",
              "english": "I dislike cold winter.",
              "audioText": "저는 추운 겨울을 싫어해요"
            },
            {
              "prompt": "State: My hobby is reading books.",
              "targetKorean": "제 취미는 독서예요.",
              "english": "My hobby is reading.",
              "audioText": "제 취미는 독서예요"
            },
            {
              "prompt": "Ask: What sports do you like?",
              "targetKorean": "어떤 운동을 좋아해요?",
              "english": "What sports do you like?",
              "audioText": "어떤 운동을 좋아해요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw11-1",
          "readingTitle": "어학당 학생들의 다양한 취미 (Varied Hobbies of Language Students)",
          "readingPassage": "서울대 한국어 어학당 학생들은 취미가 다양합니다. 사라 씨는 한국 드라마 보기를 좋아합니다. 그래서 한국어를 빨리 배웁니다. 데이비드 씨는 사진 찍기를 좋아해서 주말마다 서울의 고궁을 방문합니다. 타쿠야 씨는 요리를 좋아해서 불고기와 김치전을 직접 만듭니다. 취미 활동은 한국 생활을 더욱 즐겁게 만듭니다.",
          "readingTranslation": "SNU Korean language students have diverse hobbies. Sarah likes watching Korean dramas. Therefore, she learns Korean quickly. David likes taking photographs, so every weekend he visits Seoul's ancient palaces. Takuya likes cooking, so he makes bulgogi and kimchi pancakes himself. Hobby activities make life in Korea even more enjoyable.",
          "comprehensionQuestions": [
            {
              "question": "What does David like doing on weekends?",
              "answer": "사진 찍기 / 고궁 방문 (Taking photos / visiting ancient palaces)",
              "explanation": "데이비드 씨는 사진 찍기를 좋아해서 주말마다 서울의 고궁을 방문합니다."
            },
            {
              "question": "What does Takuya make himself?",
              "answer": "불고기와 김치전 (Bulgogi and kimchi pancakes)",
              "explanation": "불고기와 김치전을 직접 만듭니다."
            }
          ],
          "writingPrompt": "Write 5 sentences detailing your hobbies, what music or food you like, and what you dislike.",
          "writingTemplate": "1. 제 취미는 [취미 1]과/와 [취미 2]예요.\n2. 저는 [음식/예술]을/를 정말 좋아해요.\n3. 주말에 자주 [활동]을/를 해요.\n4. 하지만 [싫어하는 것]은/는 싫어해요.\n5. 취미 활동이 아주 재미있어요.",
          "sampleAnswer": "제 취미는 영화 감상과 요리예요. 저는 한국 가요를 정말 좋아해요. 주말에 자주 새로운 요리를 만들어요. 하지만 시끄러운 장소는 싫어해요. 취미 활동이 아주 재미있어요."
        }
      },
      {
        "id": "lesson-11-2",
        "code": "11.2",
        "title": "Expressing Wants and Weekend Desires",
        "koreanTitle": "-고 싶어요와 하지만",
        "situation": "Formulate personal wishes and goals using Verb Stem + -고 싶어요 and contrast clauses with 하지만.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Jeju Island (제주도) is Korea's premier holiday island, renowned for Hallasan Volcano, mandarin orange groves (감귤), emerald beaches, and fresh seafood. When expressing your own desires in Korean, attach \"-고 싶어요\" directly to the verb stem (가고 싶어요). However, when asking someone else what they want, use the honorific question \"-고 싶으세요?\".",
        "dialogue": [
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "사라 씨, 이번 방학에 뭐 하고 싶어요?",
            "english": "Sarah, what do you want to do during this vacation?",
            "notes": "뭐 하고 싶어요? = \"What do you want to do?\""
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Friend",
            "korean": "저는 제주도에 여행 가고 싶어요. 한라산도 보고 싶어요.",
            "english": "I want to travel to Jeju Island. I also want to see Hallasan Mountain.",
            "notes": "가고 싶어요 = 가다 + 고 싶어요; 보고 싶어요 = 보다 + 고 싶어요."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "제주도는 정말 아름다워요! 맛있는 흑돼지도 꼭 드셔 보세요.",
            "english": "Jeju Island is truly beautiful! Be sure to try delicious black pork too.",
            "notes": "흑돼지 = Jeju black pork."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Friend",
            "korean": "네, 먹고 싶어요! 하지만 비행기 표가 조금 비싸요.",
            "english": "Yes, I want to eat it! However, airplane tickets are a little expensive.",
            "notes": "하지만 = However / But."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "미리 예약하면 할인이 돼요. 제가 도와줄게요.",
            "english": "If you reserve in advance, you get a discount. I will help you.",
            "notes": "예약 = reservation; 도와줄게요 = I will help."
          }
        ],
        "vocabulary": [
          {
            "id": "v11-2-1",
            "korean": "-고 싶다 / -고 싶어요",
            "romanization": "-go sipda / -go sipeoyo",
            "partOfSpeech": "Expression",
            "english": "want to [verb] (first-person desire)",
            "exampleKorean": "한국 친구를 많이 사귀고 싶어요.",
            "exampleEnglish": "I want to make many Korean friends."
          },
          {
            "id": "v11-2-2",
            "korean": "하지만",
            "romanization": "hajiman",
            "partOfSpeech": "Particle",
            "english": "however / but (contrasting sentence connector)",
            "exampleKorean": "피곤해요. 하지만 공부해야 해요.",
            "exampleEnglish": "I am tired. But I must study."
          },
          {
            "id": "v11-2-3",
            "korean": "방학 / 휴가",
            "hanja": "放學 / 休暇",
            "romanization": "banghak / hyuga",
            "partOfSpeech": "Noun",
            "english": "school vacation / workplace leave (vacation)",
            "exampleKorean": "여름 방학에 고향에 가요.",
            "exampleEnglish": "I go to my hometown during summer vacation."
          },
          {
            "id": "v11-2-4",
            "korean": "여행하다 / 여행 가다",
            "hanja": "旅行",
            "romanization": "yeohaenghada / yeohaeng gada",
            "partOfSpeech": "Verb",
            "english": "to travel / to go on a trip",
            "exampleKorean": "부산으로 기차 여행을 가고 싶어요.",
            "exampleEnglish": "I want to go on a train trip to Busan."
          },
          {
            "id": "v11-2-5",
            "korean": "쉬다 / 쉬어요",
            "romanization": "swida / swieoyo",
            "partOfSpeech": "Verb",
            "english": "to rest",
            "exampleKorean": "집에서 편안하게 쉬고 싶어요.",
            "exampleEnglish": "I want to rest comfortably at home."
          }
        ],
        "grammar": [
          {
            "id": "g11-2-1",
            "pattern": "Verb Stem + -고 싶어요",
            "englishMeaning": "I want to [do verb]",
            "formula": "[Verb Stem (drop 다)] + 고 싶어요",
            "explanation": "Attach -고 싶어요 directly to any verb stem, regardless of whether it ends in a vowel or consonant. There are zero stem irregularities with this ending.",
            "rules": [
              "가다 -> 가 + 고 싶어요 = 가고 싶어요 (I want to go)",
              "먹다 -> 먹 + 고 싶어요 = 먹고 싶어요 (I want to eat)",
              "배우다 -> 배우 + 고 싶어요 = 배우고 싶어요 (I want to learn)",
              "쉬다 -> 쉬 + 고 싶어요 = 쉬고 싶어요 (I want to rest)"
            ],
            "examples": [
              {
                "korean": "한국어를 유창하게 말하고 싶어요.",
                "english": "I want to speak Korean fluently.",
                "breakdown": "말하 (speak) + 고 싶어요 (want to)"
              },
              {
                "korean": "오늘은 일찍 자고 싶어요.",
                "english": "I want to sleep early today.",
                "breakdown": "자 (sleep) + 고 싶어요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d11-2",
          "title": "Desire & Contrast Drills (-고 싶어요와 하지만 연습)",
          "instruction": "Express what you want to do and connect a counter-fact with 하지만.",
          "drills": [
            {
              "prompt": "State: I want to eat Korean food.",
              "targetKorean": "한국 음식을 먹고 싶어요.",
              "english": "I want to eat Korean food.",
              "audioText": "한국 음식을 먹고 싶어요"
            },
            {
              "prompt": "State: I want to go to Busan.",
              "targetKorean": "부산에 가고 싶어요.",
              "english": "I want to go to Busan.",
              "audioText": "부산에 가고 싶어요"
            },
            {
              "prompt": "Connect: I want to buy shoes. But I don't have money.",
              "targetKorean": "신발을 사고 싶어요. 하지만 돈이 없어요.",
              "english": "I want to buy shoes. But I have no money.",
              "audioText": "신발을 사고 싶어요 하지만 돈이 없어요"
            },
            {
              "prompt": "State: I want to meet my family.",
              "targetKorean": "가족을 만나고 싶어요.",
              "english": "I want to meet my family.",
              "audioText": "가족을 만나고 싶어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw11-2",
          "readingTitle": "나의 소원 버킷리스트 (My Wish Bucket List)",
          "readingPassage": "저는 한국에 머무는 동안 하고 싶은 일이 세 가지 있습니다. 첫째, 제주도에서 일출을 보고 싶습니다. 둘째, 서울 광장시장에서 맛있는 빈대떡을 먹고 싶습니다. 셋째, K-POP 콘서트에 직접 가서 응원하고 싶습니다. 시험이 끝나면 이 꿈들을 모두 이루고 싶습니다.",
          "readingTranslation": "While staying in Korea, there are three things I want to do. First, I want to watch the sunrise in Jeju Island. Second, I want to eat delicious mung bean pancakes at Gwangjang Market in Seoul. Third, I want to go to a K-POP concert in person and cheer. When exams end, I want to fulfill all of these dreams.",
          "comprehensionQuestions": [
            {
              "question": "What does the writer want to do at Gwangjang Market?",
              "answer": "맛있는 빈대떡 먹기 (Eat delicious mung bean pancakes)",
              "explanation": "서울 광장시장에서 맛있는 빈대떡을 먹고 싶습니다."
            },
            {
              "question": "Where does the writer want to see the sunrise?",
              "answer": "제주도 (Jeju Island)",
              "explanation": "제주도에서 일출을 보고 싶습니다."
            }
          ],
          "writingPrompt": "Write a 6-sentence paragraph describing 3 things you want to do in Korea or during your next vacation using -고 싶어요 and 하지만.",
          "writingTemplate": "1. 저는 다음 [방학 / 휴가]에 [하고 싶은 것 1]을/를 하고 싶어요.\n2. 그리고 [장소]에 여행 가고 싶어요.\n3. 그곳에서 [음식]을/를 꼭 먹고 싶어요.\n4. 하지만 [어려운 점/비용 등]이 조금 있어요.\n5. 그래도 열심히 준비하고 싶어요.\n6. 정말 기대돼요.",
          "sampleAnswer": "저는 다음 여름 방학에 한국 여행을 가고 싶어요. 그리고 서울 남산타워에 올라가고 싶어요. 그곳에서 맛있는 한정식을 꼭 먹고 싶어요. 하지만 비행기 표가 조금 비싸요. 그래도 돈을 모아서 꼭 가고 싶어요. 정말 기대돼요."
        }
      }
    ]
  },
  {
    "id": "unit-12",
    "unitNum": 12,
    "partId": "C",
    "partName": "Part C: Life & Daily Routine",
    "title": "Past Events and Experiences",
    "koreanTitle": "과거 사건과 경험",
    "overview": "Formulate accurate past tense sentences using 았어요/었어요/했어요, discuss yesterday's activities and weekend outings, and sequence events logically.",
    "lessons": [
      {
        "id": "lesson-12-1",
        "code": "12.1",
        "title": "Talking About Yesterday",
        "koreanTitle": "어제 뭐 했어요?: 았/었/했어요",
        "situation": "Master past tense conjugation for Korean verbs and adjectives using 았어요, 었어요, and 했어요 with past time words (어제, 지난주).",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korea, asking about past physical well-being (\"밥 먹었어요?\", \"약 먹었어요?\", \"어제 잘 쉬었어요?\") is an expression of genuine warmth and social bonding. When conjugating the past tense, Korean stems follow the same vowel harmony as the present tense: bright vowels (ㅏ, ㅗ) take -았어요, all other vowels take -었어요, and -하다 verbs become -했어요.",
        "dialogue": [
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "사라 씨, 어제 뭐 했어요? 연락이 안 됐어요.",
            "english": "Sarah, what did you do yesterday? I couldn't get in touch.",
            "notes": "어제 뭐 했어요? = \"What did you do yesterday?\""
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "어제 감기에 걸렸어요. 그래서 하루 종일 집에서 쉬었어요.",
            "english": "I caught a cold yesterday. So I rested at home all day long.",
            "notes": "걸렸어요 = past of 걸리다; 쉬었어요 = past of 쉬다."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "아이구, 정말요? 병원에 갔어요? 약은 먹었어요?",
            "english": "Oh dear, really? Did you go to the hospital? Did you take medicine?",
            "notes": "갔어요 = past of 가다; 먹었어요 = past of 먹다."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Exchange student",
            "korean": "네, 약국에서 약을 샀어요. 그리고 따뜻한 꿀차를 마셨어요. 지금은 많이 좋아졌어요.",
            "english": "Yes, I bought medicine at the pharmacy. And I drank warm honey tea. I am much better now.",
            "notes": "샀어요 = past of 사다; 마셨어요 = past of 마시다."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "정말 다행이에요! 무리하지 마세요.",
            "english": "That is such a relief! Please don't overwork yourself.",
            "notes": "다행이에요 = \"It is a relief\"."
          }
        ],
        "vocabulary": [
          {
            "id": "v12-1-1",
            "korean": "어제 / 그저께",
            "romanization": "eoje / geujeokke",
            "partOfSpeech": "Noun",
            "english": "yesterday / the day before yesterday",
            "exampleKorean": "어제 친구를 만났어요.",
            "exampleEnglish": "I met a friend yesterday."
          },
          {
            "id": "v12-1-2",
            "korean": "지난주 / 지난달 / 작년",
            "hanja": "── / ── / 昨年",
            "romanization": "jinanju / jinandal / jangnyeon",
            "partOfSpeech": "Noun",
            "english": "last week / last month / last year",
            "exampleKorean": "작년에 한국에 왔어요.",
            "exampleEnglish": "I came to Korea last year."
          },
          {
            "id": "v12-1-3",
            "korean": "사다 / 샀어요",
            "romanization": "sada / sasseoyo",
            "partOfSpeech": "Verb",
            "english": "to buy -> bought",
            "exampleKorean": "백화점에서 신발을 샀어요.",
            "exampleEnglish": "I bought shoes at the department store."
          },
          {
            "id": "v12-1-4",
            "korean": "가다 / 갔어요",
            "romanization": "gada / gasseoyo",
            "partOfSpeech": "Verb",
            "english": "to go -> went",
            "exampleKorean": "어제 도서관에 갔어요.",
            "exampleEnglish": "I went to the library yesterday."
          },
          {
            "id": "v12-1-5",
            "korean": "보다 / 봤어요",
            "romanization": "boda / bwasseoyo",
            "partOfSpeech": "Verb",
            "english": "to see/watch -> saw/watched",
            "exampleKorean": "극장에서 한국 영화를 봤어요.",
            "exampleEnglish": "I watched a Korean movie at the theater."
          }
        ],
        "grammar": [
          {
            "id": "g12-1-1",
            "pattern": "Verb/Adj Stem + -았어요 / -었어요 / -했어요 (Past Polite Tense)",
            "englishMeaning": "did / was / were",
            "formula": "Stem vowel ㅏ, ㅗ -> + 았어요 | Other vowels -> + 었어요 | 하다 -> 했어요",
            "explanation": "Past tense adds the infix -았/었- before the polite sentence ending -어요.",
            "rules": [
              "1. Bright Vowel (ㅏ, ㅗ): + 았어요\n   - 가다 -> 가 + 았어요 = 갔어요\n   - 보다 -> 보 + 았어요 = 봤어요\n   - 살다 -> 살 + 았어요 = 살았어요",
              "2. Dark/Neutral Vowels: + 었어요\n   - 먹다 -> 먹 + 었어요 = 먹었어요\n   - 마시다 -> 마시 + 었어요 = 마셨어요\n   - 읽다 -> 읽 + 었어요 = 읽었어요",
              "3. -하다 -> 했어요\n   - 공부하다 -> 공부했어요\n   - 운동하다 -> 운동했어요\n   - 쇼핑하다 -> 쇼핑했어요"
            ],
            "examples": [
              {
                "korean": "어제 한국어 숙제를 다 했어요.",
                "english": "I did all my Korean homework yesterday.",
                "breakdown": "하 (do) + 였어요/했어요 (did)"
              },
              {
                "korean": "점심에 비빔밥을 맛있게 먹었어요.",
                "english": "I ate bibimbap deliciously for lunch.",
                "breakdown": "먹 (eat) + 었어요 (ate)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d12-1",
          "title": "Past Tense Conjugation Drills (과거 시제 연습)",
          "instruction": "Conjugate each verb into the past tense and state the action.",
          "drills": [
            {
              "prompt": "Conjugate: 먹다 (to eat) -> [I ate pizza yesterday].",
              "targetKorean": "어제 피자를 먹었어요.",
              "english": "I ate pizza yesterday.",
              "audioText": "어제 피자를 먹었어요"
            },
            {
              "prompt": "Conjugate: 가다 (to go) -> [I went to school last week].",
              "targetKorean": "지난주에 학교에 갔어요.",
              "english": "I went to school last week.",
              "audioText": "지난주에 학교에 갔어요"
            },
            {
              "prompt": "Conjugate: 공부하다 (to study) -> [I studied Korean for 2 hours].",
              "targetKorean": "한국어를 두 시간 공부했어요.",
              "english": "I studied Korean for two hours.",
              "audioText": "한국어를 두 시간 공부했어요"
            },
            {
              "prompt": "Ask: Did you watch the movie yesterday?",
              "targetKorean": "어제 영화 봤어요?",
              "english": "Did you watch the movie yesterday?",
              "audioText": "어제 영화 봤어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw12-1",
          "readingTitle": "어제 나의 하루 (Yesterday in My Life)",
          "readingPassage": "어제는 참 바쁜 하루였습니다. 아침 여덟 시에 일어났습니다. 커피를 한 잔 마시고 바로 대학교에 갔습니다. 오전에는 전공 강의를 들었습니다. 점심에는 학생식당에서 친구들과 라면을 먹었습니다. 오후에는 도서관에서 세 시간 동안 한국어 시험공부를 했습니다. 저녁 여덟 시에 집에 돌아와서 따뜻한 물로 샤워를 하고 푹 잤습니다.",
          "readingTranslation": "Yesterday was a truly busy day. I woke up at 8 AM. I drank a cup of coffee and went straight to university. In the morning, I listened to my major lectures. At lunch, I ate ramen with my friends at the student cafeteria. In the afternoon, I studied for my Korean exam for three hours at the library. At 8 PM, I returned home, took a warm shower, and slept soundly.",
          "comprehensionQuestions": [
            {
              "question": "What did the writer eat for lunch yesterday?",
              "answer": "라면 (Ramen)",
              "explanation": "학생식당에서 친구들과 라면을 먹었습니다."
            },
            {
              "question": "How long did the writer study at the library?",
              "answer": "3시간 (Three hours)",
              "explanation": "도서관에서 세 시간 동안 한국어 시험공부를 했습니다."
            }
          ],
          "writingPrompt": "Write 6 past-tense sentences recounting your activities yesterday from morning to evening.",
          "writingTemplate": "1. 어제 저는 [시간]에 일어났어요.\n2. 아침에 [음식]을/를 먹었어요.\n3. 낮에 [장소]에 갔어요.\n4. 그곳에서 [활동]을/를 했어요.\n5. 저녁에 친구를 만났어요 / 가족과 밥을 먹었어요.\n6. 밤 [시간]에 잤어요.",
          "sampleAnswer": "어제 저는 아침 일곱 시 반에 일어났어요. 아침에 사과와 토스트를 먹었어요. 낮에 한국어 어학당에 갔어요. 교실에서 선생님과 말하기 연습을 했어요. 저녁에 친구와 함께 삼겹살을 먹었어요. 밤 열한 시에 집에 와서 일찍 잤어요."
        }
      },
      {
        "id": "lesson-12-2",
        "code": "12.2",
        "title": "Describing a Weekend Outing",
        "koreanTitle": "주말 나들이와 과거 회상",
        "situation": "Narrate a weekend trip or excursion sequencing places visited, activities done, and impressions using past tense adjectives (좋았어요, 재미있었어요, 맛있었어요).",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Gyeongbokgung Palace (경복궁) in northern Seoul is the primary royal palace of the Joseon Dynasty. Visitors who wear Hanbok (한복) receive completely free admission to the palace grounds. Directly neighboring Gyeongbokgung is Insadong (인사동), famous for traditional teahouses, art galleries, and handcrafted souvenirs.",
        "dialogue": [
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "민수 씨, 지난 주말에 뭐 했어요?",
            "english": "Min-su, what did you do last weekend?",
            "notes": "지난 주말에 = last weekend."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "친구들과 함께 경복궁에 갔어요. 한복도 입었어요.",
            "english": "I went to Gyeongbokgung Palace with my friends. We wore Hanbok too.",
            "notes": "입었어요 = past of 입다 (to wear); 한복 = traditional Korean clothes."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "와, 정말 멋있었겠네요! 사진도 많이 찍었어요?",
            "english": "Wow, that must have been so cool! Did you take many photos too?",
            "notes": "찍었어요 = past of 찍다 (to take a photo)."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "네, 궁궐 앞에서 멋진 사진을 많이 찍었어요. 그리고 인사동에서 전통차를 마셨어요.",
            "english": "Yes, we took lots of great photos in front of the palace. And we drank traditional tea in Insadong.",
            "notes": "인사동 = Insadong cultural district; 전통차 = traditional tea."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "음식은 어땠어요?",
            "english": "How was the food?",
            "notes": "어땠어요? = Past of 어때요? (\"How was it?\")."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "비빔밥과 해물파전을 먹었는데 아주 맛있었어요!",
            "english": "We ate bibimbap and seafood scallion pancake, and it was extremely delicious!",
            "notes": "맛있었어요 = past of 맛있다."
          }
        ],
        "vocabulary": [
          {
            "id": "v12-2-1",
            "korean": "경복궁 / 인사동",
            "romanization": "gyeongbokgung / insadong",
            "partOfSpeech": "Noun",
            "english": "Gyeongbokgung Palace / Insadong Cultural District",
            "exampleKorean": "경복궁에서 한복을 입었어요.",
            "exampleEnglish": "I wore Hanbok at Gyeongbokgung."
          },
          {
            "id": "v12-2-2",
            "korean": "사진을 찍다 / 찍었어요",
            "romanization": "sajineul jjikda / jjigeosseoyo",
            "partOfSpeech": "Verb",
            "english": "to take a photo -> took a photo",
            "exampleKorean": "친구들과 추억 사진을 찍었어요.",
            "exampleEnglish": "I took memory photos with my friends."
          },
          {
            "id": "v12-2-3",
            "korean": "입다 / 입었어요",
            "romanization": "ipda / ibeosseoyo",
            "partOfSpeech": "Verb",
            "english": "to wear (clothes) -> wore",
            "exampleKorean": "예쁜 옷을 입었어요.",
            "exampleEnglish": "I wore pretty clothes."
          },
          {
            "id": "v12-2-4",
            "korean": "재미있었다 / 재미있었어요",
            "romanization": "jaemiisseotda / jaemiisseosseoyo",
            "partOfSpeech": "Adjective",
            "english": "was interesting / was fun",
            "exampleKorean": "어제 본 연극이 정말 재미있었어요.",
            "exampleEnglish": "The play I watched yesterday was really fun."
          },
          {
            "id": "v12-2-5",
            "korean": "맛있었다 / 맛있었어요",
            "romanization": "masisseotda / masisseosseoyo",
            "partOfSpeech": "Adjective",
            "english": "was delicious",
            "exampleKorean": "어제 저녁 불고기가 아주 맛있었어요.",
            "exampleEnglish": "The bulgogi last night was very delicious."
          }
        ],
        "grammar": [
          {
            "id": "g12-2-1",
            "pattern": "Adjective Past: [좋았다 -> 좋았어요 / 맛있었다 -> 맛있었어요]",
            "englishMeaning": "was good / was delicious / was fun",
            "formula": "[Adjective Stem] + 았/었어요",
            "explanation": "Just like action verbs, Korean descriptive adjectives conjugate into the past tense to describe past states or feelings.",
            "rules": [
              "좋다 -> 좋 + 았어요 = 좋았어요 (It was good)",
              "맛있다 -> 맛있 + 었어요 = 맛있었어요 (It was delicious)",
              "바쁘다 -> 바빴어요 (I was busy)",
              "어렵다 -> 어려웠어요 (It was difficult - ㅂ irregular)"
            ],
            "examples": [
              {
                "korean": "어제 날씨가 정말 좋았어요.",
                "english": "The weather was really nice yesterday.",
                "breakdown": "날씨 (weather) + 가 + 좋았어요 (was good)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d12-2",
          "title": "Outing Recount Drills (나들이 경험 말하기 연습)",
          "instruction": "Narrate what you did on your outing and describe how it was.",
          "drills": [
            {
              "prompt": "State: I went to Gyeongbokgung Palace last Saturday.",
              "targetKorean": "지난 토요일에 경복궁에 갔어요.",
              "english": "I went to Gyeongbokgung Palace last Saturday.",
              "audioText": "지난 토요일에 경복궁에 갔어요"
            },
            {
              "prompt": "State: I took lots of photos with my friend.",
              "targetKorean": "친구와 함께 사진을 많이 찍었어요.",
              "english": "I took many photos with my friend.",
              "audioText": "친구와 함께 사진을 많이 찍었어요"
            },
            {
              "prompt": "Describe: The food was really delicious.",
              "targetKorean": "음식이 정말 맛있었어요.",
              "english": "The food was really delicious.",
              "audioText": "음식이 정말 맛있었어요"
            },
            {
              "prompt": "State: The weekend outing was truly fun.",
              "targetKorean": "주말 나들이가 참 재미있었어요.",
              "english": "The weekend outing was truly fun.",
              "audioText": "주말 나들이가 참 재미있었어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw12-2",
          "readingTitle": "부산 1박 2일 여행 일기 (Busan 2-Day Trip Diary)",
          "readingPassage": "지난 주말에 친구들과 KTX 기차를 타고 부산에 다녀왔습니다. 부산역에 도착해서 먼저 유명한 돼지국밥을 먹었습니다. 국물이 정말 진하고 맛있었습니다. 오후에는 해운대 해수욕장에 갔습니다. 푸른 바다가 아주 아름다웠습니다. 저녁에는 자갈치 시장에서 싱싱한 생선회를 먹었습니다. 밤에는 광안리 해변에서 화려한 드론 쇼를 보았습니다. 정말 잊을 수 없는 행복한 여행이었습니다.",
          "readingTranslation": "Last weekend, I visited Busan by KTX train with my friends. Upon arriving at Busan Station, we first ate famous pork soup with rice (Dwaeji Gukbap). The broth was really rich and delicious. In the afternoon, we went to Haeundae Beach. The blue sea was very beautiful. In the evening, we ate fresh raw fish at Jagalchi Market. At night, we watched a spectacular drone show at Gwangalli Beach. It was truly an unforgettable, happy trip.",
          "comprehensionQuestions": [
            {
              "question": "What did they eat upon arriving at Busan Station?",
              "answer": "돼지국밥 (Pork soup with rice)",
              "explanation": "유명한 돼지국밥을 먹었습니다."
            },
            {
              "question": "What did they watch at Gwangalli Beach at night?",
              "answer": "화려한 드론 쇼 (Spectacular drone show)",
              "explanation": "광안리 해변에서 화려한 드론 쇼를 보았습니다."
            }
          ],
          "writingPrompt": "Write a 6-sentence diary entry about a memorable weekend outing, describing where you went, who you were with, what you ate, and how the experience was.",
          "writingTemplate": "1. 지난 주말에 [누구]와/과 함께 [장소]에 갔어요.\n2. 날씨가 아주 [좋았어요 / 맑았어요].\n3. 그곳에서 [활동 1]을/를 했어요.\n4. 그리고 [음식]을/를 맛있게 먹었어요.\n5. [경치/분위기]가 정말 아름다웠어요.\n6. 참 [재미있었어요 / 행복했어요].",
          "sampleAnswer": "지난 주말에 친구와 함께 한강공원에 갔어요. 날씨가 아주 따뜻하고 좋았어요. 그곳에서 자전거를 타고 산책을 했어요. 그리고 잔디밭에서 한강 라면과 치킨을 맛있게 먹었어요. 강변 경치가 정말 아름다웠어요. 참 행복한 주말이었어요."
        }
      }
    ]
  },
  {
    "id": "unit-13",
    "unitNum": 13,
    "partId": "C",
    "partName": "Part C: Life & Daily Routine",
    "title": "Weather and Clothing",
    "koreanTitle": "날씨와 옷차림",
    "overview": "Describe daily weather and seasons using descriptive adjectives (덥다, 춥다, 맑다, 비가 오다), explain clothing choices, and give simple reasons.",
    "lessons": [
      {
        "id": "lesson-13-1",
        "code": "13.1",
        "title": "Discussing Today's Weather and Seasons",
        "koreanTitle": "오늘 날씨와 사계절",
        "situation": "Describe weather conditions using 덥다 (hot), 춥다 (cold), 맑다 (clear), and 비가 와요 (it rains), and identify Korea's four seasons.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Korea has four distinct, dramatic seasons: 봄 (Spring - cherry blossoms & mild breezes), 여름 (Summer - monsoon 장마 and tropical heat), 가을 (Autumn - crisp clear skies and vibrant foliage 단풍), and 겨울 (Winter - sub-zero dry cold with snow). Weather check greetings (\"오늘 날씨가 참 좋지요?\", \"오늘 꽤 춥죠?\") are classic conversation starters.",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "민수 씨, 오늘 날씨가 어때요?",
            "english": "Min-su, how is the weather today?",
            "notes": "날씨가 어때요? = \"How is the weather?\""
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "오늘은 하늘이 아주 맑고 따뜻해요.",
            "english": "Today the sky is very clear and warm.",
            "notes": "맑고 = clear and (맑다 + 고); 따뜻해요 = warm."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "내일도 날씨가 좋아요?",
            "english": "Is the weather good tomorrow too?",
            "notes": "내일도 = tomorrow too."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "일기예보에서 내일은 비가 온다고 했어요. 조금 쌀쌀할 거예요.",
            "english": "The weather forecast said it will rain tomorrow. It will be a bit chilly.",
            "notes": "비가 와요 / 비가 온다 = rain falls; 쌀쌀해요 = chilly."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "그러면 내일 우산을 꼭 챙겨야겠네요.",
            "english": "In that case, I will certainly have to take an umbrella tomorrow.",
            "notes": "우산 = umbrella; 챙겨야겠네요 = \"must pack/bring\"."
          }
        ],
        "vocabulary": [
          {
            "id": "v13-1-1",
            "korean": "날씨",
            "romanization": "nalssi",
            "partOfSpeech": "Noun",
            "english": "weather",
            "exampleKorean": "오늘 날씨가 정말 화창해요.",
            "exampleEnglish": "Today's weather is really sunny."
          },
          {
            "id": "v13-1-2",
            "korean": "봄 / 여름 / 가을 / 겨울",
            "romanization": "bom / yeoreum / gaeul / gyeoul",
            "partOfSpeech": "Noun",
            "english": "spring / summer / autumn / winter",
            "exampleKorean": "저는 시원한 가을을 제일 좋아해요.",
            "exampleEnglish": "I like cool autumn the best."
          },
          {
            "id": "v13-1-3",
            "korean": "더워요 / 추워요",
            "romanization": "deowoyo / chuwoyo",
            "partOfSpeech": "Adjective",
            "english": "hot (덥다) / cold (춥다) [ㅂ irregular]",
            "exampleKorean": "여름에는 덥고 겨울에는 추워요.",
            "exampleEnglish": "It is hot in summer and cold in winter."
          },
          {
            "id": "v13-1-4",
            "korean": "따뜻해요 / 시원해요",
            "romanization": "ttatteuthaeyo / siwonhaeyo",
            "partOfSpeech": "Adjective",
            "english": "warm (따뜻하다) / cool & refreshing (시원하다)",
            "exampleKorean": "봄바람이 참 따뜻해요.",
            "exampleEnglish": "The spring breeze is truly warm."
          },
          {
            "id": "v13-1-5",
            "korean": "비가 오다 / 눈이 오다",
            "romanization": "biga oda / nuni oda",
            "partOfSpeech": "Verb",
            "english": "to rain (rain comes) / to snow (snow comes)",
            "exampleKorean": "지금 밖에는 하얀 눈이 와요.",
            "exampleEnglish": "White snow is falling outside right now."
          }
        ],
        "grammar": [
          {
            "id": "g13-1-1",
            "pattern": "ㅂ-Irregular Adjectives (덥다 -> 더워요, 춥다 -> 추워요)",
            "englishMeaning": "Conjugating ㅂ-drop adjectives",
            "formula": "Stem ending in ㅂ + vowel ending -> ㅂ changes to 우 + 어요 = 워요",
            "explanation": "Most descriptive adjectives ending in the 받침 ㅂ change ㅂ to 우 when meeting a vowel-initial ending like -아요/어요.",
            "rules": [
              "덥다: 덥 -> 더 + 우 + 어요 = 더워요 (It is hot)",
              "춥다: 춥 -> 추 + 우 + 어요 = 추워요 (It is cold)",
              "어렵다: 어렵 -> 어려 + 우 + 어요 = 어려워요 (It is difficult)",
              "쉬운: 쉽다 -> 쉬워요 (It is easy)"
            ],
            "examples": [
              {
                "korean": "한국의 겨울은 바람이 많이 불어서 아주 추워요.",
                "english": "Korea's winter is very cold because the wind blows heavily.",
                "breakdown": "춥 (cold) -> 추워요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d13-1",
          "title": "Weather Description Drills (날씨 표현 연습)",
          "instruction": "Answer questions about the weather using ㅂ-irregular forms and weather expressions.",
          "drills": [
            {
              "prompt": "State: Today is very hot.",
              "targetKorean": "오늘은 너무 더워요.",
              "english": "Today is too hot.",
              "audioText": "오늘은 너무 더워요"
            },
            {
              "prompt": "State: Today is cold and windy.",
              "targetKorean": "오늘은 춥고 바람이 불어요.",
              "english": "Today is cold and windy.",
              "audioText": "오늘은 춥고 바람이 불어요"
            },
            {
              "prompt": "State: Rain is falling right now.",
              "targetKorean": "지금 비가 와요.",
              "english": "It is raining right now.",
              "audioText": "지금 비가 와요"
            },
            {
              "prompt": "State: In spring the weather is warm.",
              "targetKorean": "봄에는 날씨가 따뜻해요.",
              "english": "In spring the weather is warm.",
              "audioText": "봄에는 날씨가 따뜻해요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw13-1",
          "readingTitle": "한국의 사계절 매력 (The Charm of Korea's Four Seasons)",
          "readingPassage": "한국은 사계절이 뚜렷합니다. 3월부터 5월까지는 봄입니다. 봄에는 예쁜 벚꽃이 피고 날씨가 따뜻합니다. 6월부터 8월까지는 여름입니다. 여름은 덥고 비가 자주 옵니다. 9월부터 11월까지는 가을입니다. 하늘이 높고 푸르며 단풍이 아름답습니다. 12월부터 2월까지는 겨울입니다. 겨울은 매우 춥고 하얀 눈이 내립니다. 계절마다 색다른 매력이 있습니다.",
          "readingTranslation": "Korea has four distinct seasons. From March to May is spring. In spring, pretty cherry blossoms bloom and the weather is warm. From June to August is summer. Summer is hot and it rains often. From September to November is autumn. The sky is high and blue, and the autumn leaves are beautiful. From December to February is winter. Winter is very cold and white snow falls. Each season has a unique charm.",
          "comprehensionQuestions": [
            {
              "question": "Which months are autumn in Korea?",
              "answer": "9월부터 11월 (September to November)",
              "explanation": "9월부터 11월까지는 가을입니다."
            },
            {
              "question": "What is the summer weather like in Korea?",
              "answer": "덥고 비가 자주 와요 (Hot and rains often)",
              "explanation": "여름은 덥고 비가 자주 옵니다."
            }
          ],
          "writingPrompt": "Write 5 sentences describing what the weather is like in your hometown across different seasons and state your favorite season.",
          "writingTemplate": "1. 제 고향은 [도시/나라]예요.\n2. 여름에는 날씨가 아주 [더워요 / 습해요].\n3. 겨울에는 [눈이 와요 / 춥지 않아요].\n4. 제가 제일 좋아하는 계절은 [계절]이에요.\n5. 왜냐하면 [이유] 때문이에요.",
          "sampleAnswer": "제 고향은 밴쿠버예요. 여름에는 날씨가 아주 맑고 시원해요. 겨울에는 눈과 비가 자주 와요. 제가 제일 좋아하는 계절은 가을이에요. 단풍이 예쁘고 산책하기에 날씨가 참 좋아요."
        }
      },
      {
        "id": "lesson-13-2",
        "code": "13.2",
        "title": "Choosing Clothes and Colors",
        "koreanTitle": "옷차림과 색깔",
        "situation": "Identify garments (코트, 바지, 치마, 모자), match colors (흰색, 검은색, 빨간색, 파란색), and justify clothing choices based on weather.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korean, the verb for \"to wear\" changes depending on the item and where it is worn on the body: Clothes (shirts, pants, coats) take \"입다\"; Footwear (shoes, socks) takes \"신다\"; Headgear (hats, caps) takes \"쓰다\"; Accessories like scarves or neckties take \"하다\" or \"매다\"; Gloves take \"끼다\"; Watches take \"차다\".",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "민수 씨, 오늘 뭐 입을 거예요?",
            "english": "Min-su, what are you going to wear today?",
            "notes": "뭐 입을 거예요? = \"What are you going to wear?\""
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "오늘 날씨가 꽤 쌀쌀해요. 그래서 두꺼운 코트를 입을 거예요.",
            "english": "Today the weather is quite chilly. So I am going to wear a thick coat.",
            "notes": "두꺼운 = thick; 코트 = coat; 입을 거예요 = future intention."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "저도 따뜻한 파란색 니트와 목도리를 할 거예요.",
            "english": "I will wear a warm blue knit sweater and scarf too.",
            "notes": "목도리를 하다 = wear/do a scarf (uses verb 하다)."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Student",
            "korean": "파란색이 사라 씨한테 아주 잘 어울려요.",
            "english": "Blue suits you very well, Sarah.",
            "notes": "잘 어울려요 = \"suits / matches well\"."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "고마워요! 감기 조심하세요.",
            "english": "Thank you! Be careful not to catch a cold.",
            "notes": "감기 조심하세요 = Standard warm winter parting wish."
          }
        ],
        "vocabulary": [
          {
            "id": "v13-2-1",
            "korean": "코트 / 패딩 / 니트",
            "romanization": "koteu / paeding / niteu",
            "partOfSpeech": "Noun",
            "english": "coat / padded down puffer jacket (padding) / knit sweater",
            "exampleKorean": "겨울에는 롱패딩을 입어요.",
            "exampleEnglish": "In winter, I wear a long padded puffer jacket."
          },
          {
            "id": "v13-2-2",
            "korean": "바지 / 치마 / 셔츠",
            "romanization": "baji / chima / syeocheu",
            "partOfSpeech": "Noun",
            "english": "trousers / skirt / shirt",
            "exampleKorean": "편한 청바지를 입어요.",
            "exampleEnglish": "I wear comfortable jeans."
          },
          {
            "id": "v13-2-3",
            "korean": "신다 / 쓰다 / 입다",
            "romanization": "sinda / sseuda / ipda",
            "partOfSpeech": "Verb",
            "english": "wear (shoes: 신다 / hat, glasses: 쓰다 / clothes: 입다)",
            "exampleKorean": "운동화를 신어요. 모자를 써요. 옷을 입어요.",
            "exampleEnglish": "Put on sneakers. Put on a hat. Put on clothes."
          },
          {
            "id": "v13-2-4",
            "korean": "흰색 / 검은색 / 파란색 / 빨간색",
            "romanization": "heinsaek / geomeunsaek / paransaek / ppalgansaek",
            "partOfSpeech": "Noun",
            "english": "white / black / blue / red",
            "exampleKorean": "저는 검은색 옷을 자주 입어요.",
            "exampleEnglish": "I frequently wear black clothes."
          },
          {
            "id": "v13-2-5",
            "korean": "목도리 / 장갑",
            "romanization": "mokdori / jang-gap",
            "partOfSpeech": "Noun",
            "english": "muffler (scarf) / gloves",
            "exampleKorean": "추워서 목도리를 했어요.",
            "exampleEnglish": "It was cold so I put on a muffler."
          }
        ],
        "grammar": [
          {
            "id": "g13-2-1",
            "pattern": "Body-part specific wearing verbs (입다, 신다, 쓰다, 하다)",
            "englishMeaning": "to wear / put on",
            "formula": "Clothes + 입어요 | Shoes/Socks + 신어요 | Hat/Glasses + 써요 | Scarf + 해요",
            "explanation": "Match the Korean verb to the clothing classification.",
            "rules": [
              "상의/하의 (Tops & bottoms): 티셔츠를 입어요, 바지를 입어요.",
              "신발 (Footwear): 운동화를 신어요, 구두를 신어요.",
              "머리/얼굴 (Head & face): 모자를 써요, 안경을 써요.",
              "소품 (Accessories): 목도리를 해요, 넥타이를 매요."
            ],
            "examples": [
              {
                "korean": "비가 와서 장화를 신었어요.",
                "english": "It was raining so I put on rain boots.",
                "breakdown": "장화 (rain boots) + 를 + 신었어요 (wore footwear)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d13-2",
          "title": "Clothing Verbs Discrimination Drills (착용 동사 구분 연습)",
          "instruction": "Select the precise verb for each piece of clothing.",
          "drills": [
            {
              "prompt": "Say: I wear a warm coat. (use 입다)",
              "targetKorean": "따뜻한 코트를 입어요.",
              "english": "I wear a warm coat.",
              "audioText": "따뜻한 코트를 입어요"
            },
            {
              "prompt": "Say: I put on sneakers. (use 신다)",
              "targetKorean": "운동화를 신어요.",
              "english": "I put on sneakers.",
              "audioText": "운동화를 신어요"
            },
            {
              "prompt": "Say: I put on a black hat. (use 쓰다)",
              "targetKorean": "검은색 모자를 써요.",
              "english": "I put on a black hat.",
              "audioText": "검은색 모자를 써요"
            },
            {
              "prompt": "Say: I put on a warm muffler. (use 하다)",
              "targetKorean": "따뜻한 목도리를 해요.",
              "english": "I put on a warm muffler.",
              "audioText": "따뜻한 목도리를 해요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw13-2",
          "readingTitle": "오늘의 패션 스타일 (Today's Fashion Style)",
          "readingPassage": "오늘 서울의 아침 기온은 3도로 아주 쌀쌀합니다. 그래서 사람들의 옷차림이 두꺼워졌습니다. 저는 오늘 포근한 아이보리색 니트를 입었습니다. 그리고 편안한 검은색 슬랙스 바지를 입었습니다. 밖으로 나갈 때는 긴 베이지색 트렌치코트를 입고 갈색 가죽 구두를 신었습니다. 목에는 체크무늬 목도리를 둘렀습니다. 따뜻하면서도 아주 세련된 옷차림입니다.",
          "readingTranslation": "Today Seoul's morning temperature is 3 degrees, which is very chilly. Therefore, people's clothing has become thicker. Today I wore a cozy ivory knit sweater. And I wore comfortable black slacks. When going outside, I put on a long beige trench coat and wore brown leather dress shoes. Around my neck, I wrapped a checkered scarf. It is a warm yet very stylish outfit.",
          "comprehensionQuestions": [
            {
              "question": "What kind of shoes did the writer wear?",
              "answer": "갈색 가죽 구두 (Brown leather dress shoes)",
              "explanation": "갈색 가죽 구두를 신었습니다."
            },
            {
              "question": "What color knit sweater did the writer wear?",
              "answer": "아이보리색 (Ivory color)",
              "explanation": "포근한 아이보리색 니트를 입었습니다."
            }
          ],
          "writingPrompt": "Write 5-6 sentences describing what you are wearing today based on the weather, specifying the item, color, and corresponding wearing verb.",
          "writingTemplate": "1. 오늘 날씨는 [날씨 형용사]예요.\n2. 그래서 저는 [색상] [상의]을/를 입었어요.\n3. 그리고 [색상] [하의]을/를 입었어요.\n4. 신발은 편안한 [신발 종류]을/를 신었어요.\n5. [모자 / 안경 / 목도리]도 [썼어요 / 했어요].\n6. 아주 편안한 옷차림이에요.",
          "sampleAnswer": "오늘 날씨는 조금 쌀쌀해요. 그래서 저는 흰색 셔츠와 파란색 스웨터를 입었어요. 그리고 편안한 검은색 바지를 입었어요. 신발은 하얀 운동화를 신었어요. 햇빛이 강해서 선글라스도 썼어요. 아주 편안한 옷차림이에요."
        }
      }
    ]
  }
] as unknown as KoreanUnit[]),
// ==========================================
// PART D: CONNECT YOUR KOREAN (UNITS 14-16)
// ==========================================
...([
  {
    "id": "unit-14",
    "unitNum": 14,
    "partId": "D",
    "partName": "Part D: Connecting Korean",
    "title": "Transport and Going Out",
    "koreanTitle": "교통과 길 찾기",
    "overview": "Navigate Korean public transit, ask how to get to landmarks using 어떻게 가요, and use instrument/direction marker -(으)로 with transit verbs (타다, 내리다, 갈아타다).",
    "lessons": [
      {
        "id": "lesson-14-1",
        "code": "14.1",
        "title": "Asking How to Get Somewhere",
        "koreanTitle": "어떻게 가요? 와 대중교통",
        "situation": "Inquire about transit routes with 어떻게 and specify modes of transport (지하철, 버스, 택시) using -(으)로.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Seoul possesses one of the world's most punctual and comprehensive metropolitan transit systems (수도권 전철). Lines are designated by numbers and distinct colors (Line 1: Dark Blue, Line 2: Green Circle Line, Line 4: Sky Blue, etc.). Transferring (환승) between subway lines or buses within 30 minutes using a T-money card (교통카드) is free or heavily discounted.",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Foreign student",
            "korean": "실례합니다, 서울역까지 어떻게 가요?",
            "english": "Excuse me, how do I get to Seoul Station?",
            "notes": "어떻게 가요? = \"How do I get there?\"; 까지 = \"until / up to\"."
          },
          {
            "speaker": "Seoul Resident (시민)",
            "speakerRole": "Local citizen",
            "korean": "여기서 지하철 4호선으로 가세요. 가장 빨라요.",
            "english": "Go by subway Line 4 from here. It is the fastest.",
            "notes": "4호선으로 = by Line 4 (consonant + 으로); 가장 빨라요 = is the fastest."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Foreign student",
            "korean": "시간이 얼마나 걸려요?",
            "english": "How long does it take?",
            "notes": "얼마나 걸려요? = \"How long does it take?\" (걸리다 = to take time)."
          },
          {
            "speaker": "Seoul Resident (시민)",
            "speakerRole": "Local citizen",
            "korean": "이십 분 정도 걸려요. 환승 안 해도 돼요.",
            "english": "It takes about twenty minutes. You don't even need to transfer.",
            "notes": "정도 = \"about / approximately\"; 환승 = transit transfer."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Foreign student",
            "korean": "친절하게 알려 주셔서 정말 감사합니다!",
            "english": "Thank you very much for kindly letting me know!",
            "notes": "알려 주셔서 감사합니다 = Polite gratitude for directions."
          }
        ],
        "vocabulary": [
          {
            "id": "v14-1-1",
            "korean": "지하철 / 전철",
            "hanja": "地下鐵 / 電鐵",
            "romanization": "jihacheol / jeoncheol",
            "partOfSpeech": "Noun",
            "english": "subway / metro train",
            "exampleKorean": "지하철 2호선을 타요.",
            "exampleEnglish": "I take subway Line 2."
          },
          {
            "id": "v14-1-2",
            "korean": "시내버스 / 고속버스",
            "romanization": "sinaebeoseu / gosokbeoseu",
            "partOfSpeech": "Noun",
            "english": "city bus / express highway bus",
            "exampleKorean": "정류장에서 시내버스를 기다려요.",
            "exampleEnglish": "I wait for the city bus at the bus stop."
          },
          {
            "id": "v14-1-3",
            "korean": "택시 / 기차 (KTX)",
            "romanization": "taeksi / gicha",
            "partOfSpeech": "Noun",
            "english": "taxi / bullet train (KTX)",
            "exampleKorean": "짐이 많아서 택시를 탔어요.",
            "exampleEnglish": "I had lots of luggage, so I took a taxi."
          },
          {
            "id": "v14-1-4",
            "korean": "어떻게",
            "romanization": "eotteoke",
            "partOfSpeech": "Noun",
            "english": "how (method / way)",
            "exampleKorean": "명동에 어떻게 가요?",
            "exampleEnglish": "How do I get to Myeongdong?"
          },
          {
            "id": "v14-1-5",
            "korean": "얼마나 걸리다",
            "romanization": "eolmana geollida",
            "partOfSpeech": "Verb",
            "english": "how long does it take (time)",
            "exampleKorean": "집에서 학교까지 삼십 분 걸려요.",
            "exampleEnglish": "It takes thirty minutes from home to school."
          },
          {
            "id": "v14-1-6",
            "korean": "타다 / 내리다 / 갈아타다",
            "romanization": "tada / naerida / garatada",
            "partOfSpeech": "Verb",
            "english": "to ride/take / to get off / to transfer",
            "exampleKorean": "시청역에서 1호선으로 갈아타세요.",
            "exampleEnglish": "Please transfer to Line 1 at City Hall Station."
          }
        ],
        "grammar": [
          {
            "id": "g14-1-1",
            "pattern": "Noun (Transport Method) + (으)로",
            "englishMeaning": "by means of / by transport",
            "formula": "Consonant (except ㄹ) + 으로 | Vowel or ㄹ + 로",
            "explanation": "Attach -(으)로 to vehicles and instruments to express the method of traveling.",
            "rules": [
              "Ends in consonant: 지하철 + 으로 = 지하철로 (note: ㄹ ends take 로 -> 지하철로)",
              "Ends in vowel: 버스 + 로 = 버스로, 택시 + 로 = 택시로, 비행기 + 로 = 비행기로",
              "By foot: 걸어서 가요 (special expression)"
            ],
            "examples": [
              {
                "korean": "저는 매일 아침 버스로 통학해요.",
                "english": "I commute to school by bus every morning.",
                "breakdown": "버스 (bus) + 로 (by) + 통학해요 (commute to school)"
              },
              {
                "korean": "부산까지 KTX 기차로 두 시간 반 걸려요.",
                "english": "It takes two and a half hours to Busan by KTX train.",
                "breakdown": "KTX 기차 (train) + 로 (by) + 걸려요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d14-1",
          "title": "Transit Method Drills (대중교통 수단 말하기 연습)",
          "instruction": "Formulate travel instructions specifying the exact transit vehicle and -(으)로.",
          "drills": [
            {
              "prompt": "Ask: How do I get to Incheon Airport?",
              "targetKorean": "인천공항까지 어떻게 가요?",
              "english": "How do I get to Incheon Airport?",
              "audioText": "인천공항까지 어떻게 가요"
            },
            {
              "prompt": "Answer: Go by airport railroad train.",
              "targetKorean": "공항철도로 가세요.",
              "english": "Go by airport railroad train.",
              "audioText": "공항철도로 가세요"
            },
            {
              "prompt": "Ask: How long does it take by taxi?",
              "targetKorean": "택시로 시간이 얼마나 걸려요?",
              "english": "How long does it take by taxi?",
              "audioText": "택시로 시간이 얼마나 걸려요"
            },
            {
              "prompt": "Answer: It takes about 40 minutes.",
              "targetKorean": "사십 분 정도 걸려요.",
              "english": "It takes about 40 minutes.",
              "audioText": "사십 분 정도 걸려요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw14-1",
          "readingTitle": "서울 대중교통 이용 안내 (Seoul Transit Guide)",
          "readingPassage": "서울에서는 지하철과 버스를 이용하면 아주 편리합니다. 교통카드를 태그하고 타면 요금이 할인되고, 다른 노선으로 갈아탈 때 무료 환승 혜택도 받을 수 있습니다. 강남역에서 명동역까지 갈 때는 지하철 2호선을 타고 사당역에서 4호선으로 갈아타면 약 35분이 걸립니다. 출퇴근 시간에는 지하철이 버스보다 훨씬 빠릅니다.",
          "readingTranslation": "Using the subway and bus in Seoul is very convenient. If you tap and ride with a transit card, fares are discounted, and you can also receive free transfer benefits when changing to different lines. When traveling from Gangnam Station to Myeongdong Station, if you ride Line 2 and transfer to Line 4 at Sadang Station, it takes approximately 35 minutes. During rush hours, the subway is far faster than the bus.",
          "comprehensionQuestions": [
            {
              "question": "At which station do you transfer when going from Gangnam to Myeongdong?",
              "answer": "사당역 (Sadang Station)",
              "explanation": "사당역에서 4호선으로 갈아타면"
            },
            {
              "question": "Why is the subway better during rush hours?",
              "answer": "버스보다 훨씬 빨라요 (It is much faster than the bus)",
              "explanation": "출퇴근 시간에는 지하철이 버스보다 훨씬 빠릅니다."
            }
          ],
          "writingPrompt": "Write 5 sentences explaining how to get from your home to your school or workplace using transport modes, -(으)로, and duration expressions.",
          "writingTemplate": "1. 제 집에서 [목적지]까지 [교통수단](으)로 가요.\n2. 먼저 [역/정류장]에서 [수단 1]을/를 타요.\n3. 그리고 [환승역]에서 [수단 2](으)로 갈아타요.\n4. [목적지]역에서 내려요.\n5. 시간은 약 [시간] 정도 걸려요.",
          "sampleAnswer": "제 집에서 서울대학교까지 지하철로 가요. 먼저 합정역에서 지하철 2호선을 타요. 그리고 서울대입구역에서 내려요. 그곳에서 버스로 갈아타요. 전체 시간은 약 40분 정도 걸려요."
        }
      },
      {
        "id": "lesson-14-2",
        "code": "14.2",
        "title": "Finding Places in Town and Directions",
        "koreanTitle": "길 찾기와 방향 안내",
        "situation": "Guide pedestrians using directional particles -(으)로 and directional verbs (쭉 가세요, 오른쪽으로 도세요, 건너세요).",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Giving directions in Korean uses clear spatial and directional commands ending in the polite imperative -(으)세요: \"쭉 가세요\" (go straight), \"오른쪽으로 가세요\" (go to the right), \"왼쪽으로 도세요\" (turn left), and \"횡단보도를 건너세요\" (cross the crosswalk).",
        "dialogue": [
          {
            "speaker": "Tourist (관광객)",
            "speakerRole": "Lost traveler",
            "korean": "실례합니다, 인사동 쌈지길이 어디예요?",
            "english": "Excuse me, where is Insadong Ssamziegil?",
            "notes": "쌈지길 = famous spiral handicraft mall in Insadong."
          },
          {
            "speaker": "Local Guide (안내원)",
            "speakerRole": "Tourist information volunteer",
            "korean": "이 길로 똑바로 100미터쯤 쭉 가세요.",
            "english": "Go straight along this street for about 100 meters.",
            "notes": "이 길로 = along this road; 똑바로 / 쭉 = straight."
          },
          {
            "speaker": "Tourist (관광객)",
            "speakerRole": "Lost traveler",
            "korean": "100미터 직진한 후에 어디로 가요?",
            "english": "After going straight 100 meters, where do I go?",
            "notes": "어디로 = toward where; 직진 = moving straight ahead."
          },
          {
            "speaker": "Local Guide (안내원)",
            "speakerRole": "Tourist information volunteer",
            "korean": "사거리에서 오른쪽으로 도세요. 횡단보도를 건너면 바로 보여요.",
            "english": "Turn right at the 4-way intersection. If you cross the pedestrian crosswalk, you will see it right away.",
            "notes": "오른쪽으로 = to the right; 횡단보도 = crosswalk; 건너면 = if you cross."
          },
          {
            "speaker": "Tourist (관광객)",
            "speakerRole": "Lost traveler",
            "korean": "자세히 설명해 주셔서 정말 감사합니다!",
            "english": "Thank you so much for explaining in detail!",
            "notes": "자세히 = in detail."
          }
        ],
        "vocabulary": [
          {
            "id": "v14-2-1",
            "korean": "오른쪽 / 왼쪽 / 똑바로 (직진)",
            "romanization": "oreunjjok / oenjjok / ttokbaro",
            "partOfSpeech": "Noun",
            "english": "right side / left side / straight",
            "exampleKorean": "사거리에서 왼쪽으로 가세요.",
            "exampleEnglish": "Go to the left at the four-way intersection."
          },
          {
            "id": "v14-2-2",
            "korean": "사거리 / 삼거리",
            "hanja": "四거리 / 三거리",
            "romanization": "sageori / samgeori",
            "partOfSpeech": "Noun",
            "english": "four-way intersection / three-way T-junction",
            "exampleKorean": "신호등 있는 사거리에서 멈추세요.",
            "exampleEnglish": "Stop at the intersection with the traffic light."
          },
          {
            "id": "v14-2-3",
            "korean": "횡단보도 / 신호등",
            "hanja": "橫斷步道 / 信號燈",
            "romanization": "hoengdanbodo / sinhodeung",
            "partOfSpeech": "Noun",
            "english": "pedestrian crosswalk / traffic light",
            "exampleKorean": "초록불에 횡단보도를 건너요.",
            "exampleEnglish": "Cross the crosswalk on the green light."
          },
          {
            "id": "v14-2-4",
            "korean": "건너다 / 건너세요",
            "romanization": "geonneoda / geonneoseyo",
            "partOfSpeech": "Verb",
            "english": "to cross -> please cross",
            "exampleKorean": "길을 조심히 건너세요.",
            "exampleEnglish": "Please cross the street carefully."
          },
          {
            "id": "v14-2-5",
            "korean": "돌다 / 도세요",
            "romanization": "dolda / doseyo",
            "partOfSpeech": "Verb",
            "english": "to turn -> please turn",
            "exampleKorean": "약국 모퉁이에서 우회전하세요 (오른쪽으로 도세요).",
            "exampleEnglish": "Turn right at the pharmacy corner."
          }
        ],
        "grammar": [
          {
            "id": "g14-2-1",
            "pattern": "Direction Noun + (으)로 (Directional Marker: Towards)",
            "englishMeaning": "towards / in the direction of",
            "formula": "Consonant + 으로 | Vowel or ㄹ + 로",
            "explanation": "When attached to spatial words (오른쪽, 왼쪽, 위, 아래, 앞, 뒤), -(으)로 marks orientation or movement path.",
            "rules": [
              "오른쪽 (consonant) + 으로 = 오른쪽으로 (to the right)",
              "왼쪽 (consonant) + 으로 = 왼쪽으로 (to the left)",
              "위 (vowel) + 로 = 위로 (upward)"
            ],
            "examples": [
              {
                "korean": "다음 골목에서 왼쪽으로 도세요.",
                "english": "Please turn left at the next alley.",
                "breakdown": "다음 골목 (next alley) + 에서 + 왼쪽 (left) + 으로 (toward) + 도세요 (turn)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d14-2",
          "title": "Directional Instruction Drills (방향 안내 연습)",
          "instruction": "Give clear walking directions using directional adverbs and -(으)로.",
          "drills": [
            {
              "prompt": "Instruct: Go straight ahead.",
              "targetKorean": "앞으로 똑바로 가세요.",
              "english": "Go straight ahead.",
              "audioText": "앞으로 똑바로 가세요"
            },
            {
              "prompt": "Instruct: Turn to the right at the bank.",
              "targetKorean": "은행에서 오른쪽으로 도세요.",
              "english": "Turn right at the bank.",
              "audioText": "은행에서 오른쪽으로 도세요"
            },
            {
              "prompt": "Instruct: Turn to the left at the pharmacy.",
              "targetKorean": "약국에서 왼쪽으로 도세요.",
              "english": "Turn left at the pharmacy.",
              "audioText": "약국에서 왼쪽으로 도세요"
            },
            {
              "prompt": "Instruct: Cross the crosswalk over there.",
              "targetKorean": "저기 횡단보도를 건너세요.",
              "english": "Cross the crosswalk over there.",
              "audioText": "저기 횡단보도를 건너세요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw14-2",
          "readingTitle": "우리 집 찾아오는 길 (Directions to My House)",
          "readingPassage": "친구들을 제 생일 파티에 초대합니다. 우리 집 찾아오는 방법을 알려 드릴게요. 지하철 3호선 안국역 2번 출구로 나오세요. 나온 후에 편의점 쪽으로 50미터 직진하세요. 베이커리 빵집이 나오면 오른쪽 골목으로 도세요. 골목 안으로 30미터쯤 들어오면 1층에 꽃집이 있는 흰색 빌라 건물 302호입니다.",
          "readingTranslation": "I invite my friends to my birthday party. Let me tell you how to find my house. Come out of Exit 2 of Anguk Station on Subway Line 3. After coming out, go straight for 50 meters toward the convenience store. When the bakery appears, turn into the right alley. If you walk in about 30 meters into the alley, it is Apartment 302 of the white villa building with a flower shop on the first floor.",
          "comprehensionQuestions": [
            {
              "question": "Which subway station exit should guests use?",
              "answer": "안국역 2번 출구 (Anguk Station Exit 2)",
              "explanation": "지하철 3호선 안국역 2번 출구로 나오세요."
            },
            {
              "question": "What store is located on the first floor of the building?",
              "answer": "꽃집 (Flower shop)",
              "explanation": "1층에 꽃집이 있는 흰색 빌라 건물"
            }
          ],
          "writingPrompt": "Write 5 sentences providing clear walking directions from a local subway station or bus stop to your home, favorite cafe, or classroom.",
          "writingTemplate": "1. [역/정류장] [출구 번호]번 출구로 나오세요.\n2. 출구 앞에서 [방향]으로 [거리] 직진하세요.\n3. [건물/상점]이 보이면 [오른쪽/왼쪽]으로 도세요.\n4. 횡단보도를 건너세요.\n5. 건너편에 [목적지]이/가 바로 있어요.",
          "sampleAnswer": "홍대입구역 9번 출구로 나오세요. 출구 앞에서 앞으로 100미터 똑바로 직진하세요. 올리브영 화장품 가게가 보이면 왼쪽으로 도세요. 횡단보도를 하나 건너세요. 건너편에 우리가 만날 카페가 바로 있어요."
        }
      }
    ]
  },
  {
    "id": "unit-15",
    "unitNum": 15,
    "partId": "D",
    "partName": "Part D: Connecting Korean",
    "title": "Plans and Invitations",
    "koreanTitle": "계획과 초대",
    "overview": "Express future intentions using -(으)ㄹ 거예요, suggest shared plans using -(으)ㄹ까요?, and accept or politely decline invitations.",
    "lessons": [
      {
        "id": "lesson-15-1",
        "code": "15.1",
        "title": "Inviting a Friend and Future Plansㄹ 거예요)",
        "koreanTitle": "친구 초대와 -(으",
        "situation": "Formulate future commitments, intentions, and vacation plans using Verb Stem + -(으)ㄹ 거예요.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Korean professional baseball (KBO) at venues like Jamsil Baseball Stadium (잠실야구장) is legendary for its participatory fan culture. Fans sing individual cheer songs for every batter, eat fried chicken and beer (치맥), and cheer rhythmically with thundersticks.",
        "dialogue": [
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "사라 씨, 이번 주말에 특별한 계획이 있어요?",
            "english": "Sarah, do you have special plans this weekend?",
            "notes": "특별한 계획 = special plans."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "토요일에 한국인 튜터와 어학원에서 공부할 거예요. 일요일에는 계획 없어요.",
            "english": "On Saturday I am going to study at the language academy with my Korean tutor. On Sunday I have no plans.",
            "notes": "공부할 거예요 = 공부하다 + ㄹ 거예요 (future intention)."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "그러면 일요일에 같이 야구장에 갈래요? 재미있는 경기가 있을 거예요.",
            "english": "In that case, would you like to go to the baseball stadium together on Sunday? There will be an interesting match.",
            "notes": "야구장 = baseball stadium; 있을 거예요 = there will be."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Student",
            "korean": "와, 정말 신나요! 한국 야구 응원을 꼭 보고 싶었어요.",
            "english": "Wow, that sounds so exciting! I really wanted to see Korean baseball cheering.",
            "notes": "신나요 = exciting; 응원 = cheering/fan songs."
          },
          {
            "speaker": "Min-su (민수)",
            "speakerRole": "Friend",
            "korean": "제가 티켓을 예매할게요. 잠실야구장에서 만나요!",
            "english": "I will reserve the tickets. Let's meet at Jamsil Baseball Stadium!",
            "notes": "예매할게요 = I will book/reserve."
          }
        ],
        "vocabulary": [
          {
            "id": "v15-1-1",
            "korean": "계획",
            "hanja": "計劃",
            "romanization": "gyehoek",
            "partOfSpeech": "Noun",
            "english": "plan / project",
            "exampleKorean": "미래 계획을 세워요.",
            "exampleEnglish": "I make future plans."
          },
          {
            "id": "v15-1-2",
            "korean": "야구장 / 경기장",
            "hanja": "野球場 / 競技場",
            "romanization": "yagujang / gyeonggijang",
            "partOfSpeech": "Noun",
            "english": "baseball stadium / sports stadium",
            "exampleKorean": "야구장에서 신나게 응원해요.",
            "exampleEnglish": "We cheer excitedly at the baseball stadium."
          },
          {
            "id": "v15-1-3",
            "korean": "예매하다 / 예약하다",
            "hanja": "豫買 / 豫約",
            "romanization": "yemaehada / yeyakhada",
            "partOfSpeech": "Verb",
            "english": "to purchase tickets in advance / to reserve",
            "exampleKorean": "영화표를 미리 예매했어요.",
            "exampleEnglish": "I reserved the movie tickets in advance."
          },
          {
            "id": "v15-1-4",
            "korean": "내일 / 다음 주 / 내년",
            "hanja": "來日 / ── / 來年",
            "romanization": "naeil / daeumju / naenyeon",
            "partOfSpeech": "Noun",
            "english": "tomorrow / next week / next year",
            "exampleKorean": "다음 주에 고향 친구가 와요.",
            "exampleEnglish": "My hometown friend is coming next week."
          }
        ],
        "grammar": [
          {
            "id": "g15-1-1",
            "pattern": "Verb Stem + -(으)ㄹ 거예요 (Future / Probable Tense)",
            "englishMeaning": "will / am going to [do verb]",
            "formula": "Consonant ends (받침 O) + 을 거예요 | Vowel ends (받침 X) or ㄹ ends + ㄹ 거예요",
            "explanation": "Expresses future intention, planned action, or objective probability.",
            "rules": [
              "Stem ends in vowel: 가다 -> 가 + ㄹ 거예요 = 갈 거예요",
              "Stem ends in consonant: 먹다 -> 먹 + 을 거예요 = 먹을 거예요",
              "Stem ends in ㄹ: 살다 -> 살 거예요, 만들다 -> 만들 거예요",
              "하다 verbs: 하다 -> 할 거예요, 공부하다 -> 공부할 거예요"
            ],
            "examples": [
              {
                "korean": "저는 주말에 친구들과 삼겹살을 먹을 거예요.",
                "english": "I am going to eat pork belly with friends on the weekend.",
                "breakdown": "먹 (eat) + 을 거예요 (will eat)"
              },
              {
                "korean": "내일은 날씨가 아주 맑을 거예요.",
                "english": "Tomorrow the weather will be very clear.",
                "breakdown": "맑 (clear) + 을 거예요 (will be)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d15-1",
          "title": "Future Tense Formation Drills (미래 시제 연습)",
          "instruction": "Conjugate each verb into the future tense -(으)ㄹ 거예요.",
          "drills": [
            {
              "prompt": "Conjugate: 만나다 (to meet) -> [I will meet Sarah tomorrow].",
              "targetKorean": "내일 사라 씨를 만날 거예요.",
              "english": "I will meet Sarah tomorrow.",
              "audioText": "내일 사라 씨를 만날 거예요"
            },
            {
              "prompt": "Conjugate: 읽다 (to read) -> [I will read a book tonight].",
              "targetKorean": "오늘 밤에 책을 읽을 거예요.",
              "english": "I will read a book tonight.",
              "audioText": "오늘 밤에 책을 읽을 거예요"
            },
            {
              "prompt": "Conjugate: 여행하다 (to travel) -> [I will travel to Busan next month].",
              "targetKorean": "다음 달에 부산을 여행할 거예요.",
              "english": "I will travel to Busan next month.",
              "audioText": "다음 달에 부산을 여행할 거예요"
            },
            {
              "prompt": "Conjugate: 만들다 (to make) -> [I will make Korean food].",
              "targetKorean": "한국 음식을 만들 거예요.",
              "english": "I will make Korean food.",
              "audioText": "한국 음식을 만들 거예요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw15-1",
          "readingTitle": "사라의 여름방학 계획서 (Sarah's Summer Vacation Plan)",
          "readingPassage": "이번 여름방학은 두 달 동안 아주 알차게 보낼 거예요. 첫 번째 달에는 서울대학교 어학당에서 2급 한국어 과정을 열심히 공부할 거예요. 한국어 말하기를 매일 연습할 거예요. 두 번째 달에는 친구들과 제주도와 경주로 일주일 동안 여행을 갈 거예요. 한국의 전통 유적지를 둘러보고 맛있는 지역 음식도 많이 먹을 거예요. 방학이 정말 기다려져요.",
          "readingTranslation": "This summer vacation, I am going to spend two months very productively. In the first month, I will study the Level 2 Korean course diligently at the SNU Language Education Center. I will practice Korean speaking every day. In the second month, I will go on a one-week trip to Jeju Island and Gyeongju with friends. I will tour Korea's traditional historical sites and eat lots of delicious regional food. I am really looking forward to vacation.",
          "comprehensionQuestions": [
            {
              "question": "What course will Sarah study in the first month?",
              "answer": "2급 한국어 과정 (Level 2 Korean course)",
              "explanation": "2급 한국어 과정을 열심히 공부할 거예요."
            },
            {
              "question": "Which cities will Sarah visit in the second month?",
              "answer": "제주도와 경주 (Jeju Island and Gyeongju)",
              "explanation": "친구들과 제주도와 경주로 일주일 동안 여행을 갈 거예요."
            }
          ],
          "writingPrompt": "Write a 6-sentence paragraph describing your goals and plans for next week or your next holiday using the future tense -(으)ㄹ 거예요.",
          "writingTemplate": "1. 저는 다음 [주 / 방학]에 많은 계획이 있어요.\n2. 먼저 [목표 1]을/를 할 거예요.\n3. 그리고 [장소]에 갈 거예요.\n4. 그곳에서 [친구/가족]을/를 만날 거예요.\n5. 맛있는 [음식]도 먹을 거예요.\n6. 아주 즐거운 시간을 보낼 거예요.",
          "sampleAnswer": "저는 다음 주말에 많은 계획이 있어요. 먼저 토요일 아침에 밀린 청소와 빨래를 할 거예요. 오후에는 강남 서점에 갈 거예요. 서점에서 재미있는 한국어 소설을 살 거예요. 저녁에는 친구를 만나서 불고기를 먹을 거예요. 아주 보람찬 주말을 보낼 거예요."
        }
      },
      {
        "id": "lesson-15-2",
        "code": "15.2",
        "title": "Accepting and Declining Invitationsㄹ까요?)",
        "koreanTitle": "초대 수락과 거절: -(으",
        "situation": "Propose joint activities using -(으)ㄹ까요?, accept warmly, or politely decline with considerate excuses.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "In Korean etiquette, declining an invitation directly with a flat \"아니요\" (No) can sound blunt or abrasive. Koreans soften refusals by opening with \"미안해요\" (I'm sorry) or \"아쉽지만...\" (It's regrettable, but...) followed by a clear reason (\"선약이 있어요\" - I have a prior engagement, or \"시험공부를 해야 해요\" - I must study for exams).",
        "dialogue": [
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "유진 씨, 오늘 수업 끝나고 같이 커피 한잔할까요?",
            "english": "Yu-jin, shall we have a cup of coffee together after class today?",
            "notes": "커피 한잔할까요? = \"Shall we have a cup of coffee together?\""
          },
          {
            "speaker": "Yujin (유진)",
            "speakerRole": "Student",
            "korean": "정말 미안해요, 데이비드 씨. 오늘은 치과 예약이 있어요.",
            "english": "I am really sorry, David. Today I have a dentist appointment.",
            "notes": "치과 = dentist; 예약 = appointment."
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "아, 그렇군요! 그러면 내일은 어때요?",
            "english": "Ah, I see! Then how about tomorrow?",
            "notes": "내일은 어때요? = Polite alternative proposal."
          },
          {
            "speaker": "Yujin (유진)",
            "speakerRole": "Student",
            "korean": "내일은 좋아요! 내일 점심 같이 먹을까요?",
            "english": "Tomorrow is good! Shall we eat lunch together tomorrow?",
            "notes": "점심 같이 먹을까요? = \"Shall we eat lunch together?\""
          },
          {
            "speaker": "David (데이비드)",
            "speakerRole": "Student",
            "korean": "네, 좋아요! 내일 열두 시에 학생회관 앞에서 봐요.",
            "english": "Yes, sounds great! See you tomorrow at 12:00 in front of the Student Hall.",
            "notes": "학생회관 = Student Center/Hall."
          }
        ],
        "vocabulary": [
          {
            "id": "v15-2-1",
            "korean": "미안해요 / 죄송해요",
            "hanja": "未安 / 罪悚",
            "romanization": "mianhaeyo / joesonghaeyo",
            "partOfSpeech": "Expression",
            "english": "I am sorry (polite informal / formal polite)",
            "exampleKorean": "늦어서 정말 죄송합니다.",
            "exampleEnglish": "I am truly sorry for being late."
          },
          {
            "id": "v15-2-2",
            "korean": "선약",
            "hanja": "先約",
            "romanization": "seonyak",
            "partOfSpeech": "Noun",
            "english": "prior engagement / previous appointment",
            "exampleKorean": "그날은 선약이 있어서 곤란해요.",
            "exampleEnglish": "I have a prior engagement that day, so it is difficult."
          },
          {
            "id": "v15-2-3",
            "korean": "좋아요 / 괜찮아요",
            "romanization": "joayo / gwaenchanayo",
            "partOfSpeech": "Expression",
            "english": "Sounds good / That is fine",
            "exampleKorean": "네, 그 시간이면 괜찮아요.",
            "exampleEnglish": "Yes, if it is that time, it is fine."
          },
          {
            "id": "v15-2-4",
            "korean": "다음에 / 나중에",
            "romanization": "daeume / najung-e",
            "partOfSpeech": "Noun",
            "english": "next time / later on",
            "exampleKorean": "다음에 꼭 같이 가요.",
            "exampleEnglish": "Let us definitely go together next time."
          }
        ],
        "grammar": [
          {
            "id": "g15-2-1",
            "pattern": "Verb Stem + -(으)ㄹ까요? (Shall we...? / Shall I...?)",
            "englishMeaning": "Shall we [do verb] together?",
            "formula": "Consonant ends + 을까요? | Vowel ends + ㄹ까요?",
            "explanation": "Used to ask the listener's opinion or propose a shared activity.",
            "rules": [
              "Vowel ends: 가다 -> 갈까요? (Shall we go?), 보다 -> 볼까요? (Shall we watch?)",
              "Consonant ends: 먹다 -> 먹을까요? (Shall we eat?), 앉다 -> 앉을까요? (Shall we sit?)",
              "Accepting: 네, 좋아요! 같이 [아요/어요].",
              "Declining: 미안해요, [이유]이/가 있어서 못 가요."
            ],
            "examples": [
              {
                "korean": "우리 오늘 저녁에 한식 먹을까요?",
                "english": "Shall we eat Korean food this evening?",
                "breakdown": "우리 (we) + 먹 (eat) + 을까요? (shall we eat?)"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d15-2",
          "title": "Suggestion & Response Drills (제안과 수락/거절 연습)",
          "instruction": "Propose suggestions with -(으)ㄹ까요? and respond politely.",
          "drills": [
            {
              "prompt": "Suggest: Shall we drink coffee together?",
              "targetKorean": "우리 같이 커피 마실까요?",
              "english": "Shall we drink coffee together?",
              "audioText": "우리 같이 커피 마실까요"
            },
            {
              "prompt": "Accept: Yes, sounds great! Let's go together.",
              "targetKorean": "네, 좋아요! 같이 가요.",
              "english": "Yes, sounds great! Let's go together.",
              "audioText": "네 좋아요 같이 가요"
            },
            {
              "prompt": "Decline: I am sorry. I have an exam today.",
              "targetKorean": "미안해요. 오늘은 시험이 있어요.",
              "english": "I am sorry. Today I have an exam.",
              "audioText": "미안해요 오늘은 시험이 있어요"
            },
            {
              "prompt": "Suggest alternative: Then let's meet on Friday.",
              "targetKorean": "그러면 금요일에 만나요.",
              "english": "Then let's meet on Friday.",
              "audioText": "그러면 금요일에 만나요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw15-2",
          "readingTitle": "동아리 회식 초대장 (Club Dinner Invitation)",
          "readingPassage": "한국어 회화 동아리 회원 여러분, 안녕하세요? 이번 주 금요일 저녁 6시에 신촌 고깃집에서 중간 모임을 가질 예정입니다. 맛있는 삼겹살을 먹으면서 한국어 연습도 하고 친목을 다질 예정입니다. 참석이 가능하신 분은 목요일까지 회장에게 카톡으로 알려 주세요. 혹시 선약이 있으신 분은 다음에 꼭 함께해요!",
          "readingTranslation": "Hello members of the Korean Conversation Club! This Friday at 6 PM, we plan to hold a midterm gathering at a Sinchon barbecue restaurant. While eating delicious pork belly, we will practice Korean and build camaraderie. Those who can attend, please notify the president via KakaoTalk by Thursday. If anyone has prior plans, please be sure to join us next time!",
          "comprehensionQuestions": [
            {
              "question": "When and where is the club gathering held?",
              "answer": "금요일 저녁 6시 신촌 고깃집 (Friday 6 PM at Sinchon BBQ)",
              "explanation": "이번 주 금요일 저녁 6시에 신촌 고깃집에서"
            },
            {
              "question": "By when must members notify their attendance?",
              "answer": "목요일까지 (By Thursday)",
              "explanation": "참석이 가능하신 분은 목요일까지"
            }
          ],
          "writingPrompt": "Write a realistic 5-line message declining an invitation from a classmate due to prior study commitments, and proposing an alternative time.",
          "writingTemplate": "1. [이름] 씨, 초대해 줘서 고마워요.\n2. 하지만 [날짜/시간]에는 [이유]이/가 있어서 갈 수 없어요.\n3. 정말 미안해요.\n4. 대신 [다른 요일/시간]에 만날까요?\n5. 그때 맛있는 커피 살게요!",
          "sampleAnswer": "민수 씨, 저녁 식사에 초대해 줘서 고마워요. 하지만 금요일에는 한국어 말하기 시험공부가 있어서 갈 수 없어요. 정말 아쉽고 미안해요. 대신 시험이 끝나는 토요일 점심에 같이 먹을까요? 그때 제가 맛있는 커피 살게요!"
        }
      }
    ]
  },
  {
    "id": "unit-16",
    "unitNum": 16,
    "partId": "D",
    "partName": "Part D: Connecting Korean",
    "title": "Everyday Communication and Integration",
    "koreanTitle": "종합 의사소통과 정리",
    "overview": "Handle everyday communicative hurdles using repair phrases (다시 말해 주세요, 천천히 말해 주세요, 모르겠어요), and synthesize all Level 1 grammar and vocabulary into comprehensive narratives.",
    "lessons": [
      {
        "id": "lesson-16-1",
        "code": "16.1",
        "title": "Explaining a Problem and Conversation Repair",
        "koreanTitle": "대화 수리와 문제 설명",
        "situation": "Keep conversations going when confused by asking native speakers to repeat, slow down, or explain words.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Never remain silent when you don't understand something in Korea! Native speakers deeply appreciate proactive communication repair. Essential conversational survival phrases include: \"천천히 말해 주세요\" (Please speak slowly), \"다시 한번 말해 주세요\" (Please say it once again), and \"한국어로 어떻게 말해요?\" (How do you say this in Korean?).",
        "dialogue": [
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Foreign learner",
            "korean": "선생님, 죄송하지만 방금 하신 말씀을 다시 한번 말씀해 주시겠어요?",
            "english": "Teacher, I am sorry, but could you please say what you just said once more?",
            "notes": "다시 한번 = once more; 말씀해 주시겠어요 = respectful request."
          },
          {
            "speaker": "Teacher (선생님)",
            "speakerRole": "Korean instructor",
            "korean": "네, 그럼요. 조금 더 천천히 말해 줄게요.",
            "english": "Yes, of course. I will speak a little more slowly for you.",
            "notes": "천천히 = slowly."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Foreign learner",
            "korean": "감사합니다. 그런데 그 단어의 뜻을 잘 모르겠어요. 설명해 주세요.",
            "english": "Thank you. But I don't know the meaning of that word well. Please explain it.",
            "notes": "모르겠어요 = I don't know; 뜻 = meaning; 설명해 주세요 = please explain."
          },
          {
            "speaker": "Teacher (선생님)",
            "speakerRole": "Korean instructor",
            "korean": "이 단어는 쉬운 말로 \"약속\"이라는 뜻이에요.",
            "english": "This word means \"appointment / promise\" in simple words.",
            "notes": "쉬운 말로 = in simple words."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Foreign learner",
            "korean": "아, 이제 이해했어요! 정말 감사합니다.",
            "english": "Ah, I understand now! Thank you so much.",
            "notes": "이제 이해했어요 = \"Now I understood\"."
          }
        ],
        "vocabulary": [
          {
            "id": "v16-1-1",
            "korean": "다시 / 또",
            "romanization": "dasi / tto",
            "partOfSpeech": "Adverb",
            "english": "again / once more",
            "exampleKorean": "다시 말씀해 주세요.",
            "exampleEnglish": "Please speak once again."
          },
          {
            "id": "v16-1-2",
            "korean": "천천히",
            "romanization": "cheoncheonhi",
            "partOfSpeech": "Adverb",
            "english": "slowly",
            "exampleKorean": "조금만 천천히 말씀해 주시겠어요?",
            "exampleEnglish": "Could you please speak just a little more slowly?"
          },
          {
            "id": "v16-1-3",
            "korean": "모르다 / 모르겠어요",
            "romanization": "moreuda / moreugesseoyo",
            "partOfSpeech": "Verb",
            "english": "to not know -> I don't know",
            "exampleKorean": "이 단어 뜻을 잘 모르겠어요.",
            "exampleEnglish": "I don't know the meaning of this word well."
          },
          {
            "id": "v16-1-4",
            "korean": "알다 / 알겠어요 / 이해했어요",
            "romanization": "alda / algesseoyo / ihaehaesseoyo",
            "partOfSpeech": "Verb",
            "english": "to know -> Understood / I got it",
            "exampleKorean": "네, 무슨 뜻인지 잘 알겠어요.",
            "exampleEnglish": "Yes, I understand well what it means."
          },
          {
            "id": "v16-1-5",
            "korean": "도와주세요",
            "romanization": "dowajuseyo",
            "partOfSpeech": "Expression",
            "english": "please help me",
            "exampleKorean": "길을 잃었어요. 좀 도와주세요.",
            "exampleEnglish": "I lost my way. Please help me a little."
          }
        ],
        "grammar": [
          {
            "id": "g16-1-1",
            "pattern": "다시 말해 주세요 / 천천히 말해 주세요 / 써 주세요",
            "englishMeaning": "Please repeat / Please speak slowly / Please write it down",
            "formula": "[Verb Stem + 아/어] + 주세요",
            "explanation": "Using the polite request form -아/어 주세요 with conversational repair verbs.",
            "rules": [
              "말하다 -> 말해 주세요 (Please speak)",
              "천천히 말해 주세요 (Please speak slowly)",
              "다시 한번 말해 주세요 (Please say it once again)",
              "종이에 써 주세요 (Please write it down on paper)"
            ],
            "examples": [
              {
                "korean": "죄송하지만 한국어로 다시 말씀해 주세요.",
                "english": "I am sorry, but please say it again in Korean.",
                "breakdown": "한국어 (Korean language) + 로 (in) + 다시 (again) + 말씀해 주세요"
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d16-1",
          "title": "Conversational Repair Drills (대화 수리 표현 연습)",
          "instruction": "Practice delivering emergency comprehension phrases clearly and politely.",
          "drills": [
            {
              "prompt": "Request: Please speak slowly.",
              "targetKorean": "천천히 말해 주세요.",
              "english": "Please speak slowly.",
              "audioText": "천천히 말해 주세요"
            },
            {
              "prompt": "Request: Please say it once more.",
              "targetKorean": "다시 한번 말해 주세요.",
              "english": "Please say it once more.",
              "audioText": "다시 한번 말해 주세요"
            },
            {
              "prompt": "State: I don't know well. Please help me.",
              "targetKorean": "잘 모르겠어요. 도와주세요.",
              "english": "I don't know well. Please help me.",
              "audioText": "잘 모르겠어요 도와주세요"
            },
            {
              "prompt": "Ask: How do you say this in Korean?",
              "targetKorean": "이거 한국어로 어떻게 말해요?",
              "english": "How do you say this in Korean?",
              "audioText": "이거 한국어로 어떻게 말해요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw16-1",
          "readingTitle": "외국인 유학생을 위한 생생 한국어 팁 (Live Korean Tips for Foreign Students)",
          "readingPassage": "한국어를 배울 때 모르는 단어가 나오거나 상대방의 말이 너무 빠르면 당황하지 마세요. 한국 사람들은 외국인이 한국어로 노력하는 모습을 매우 좋아합니다. \"천천히 말씀해 주세요\" 또는 \"다시 한번 말씀해 주시겠어요?\"라고 정중하게 부탁하면 누구나 친절하게 다시 설명해 줍니다. 모르는 것을 두려워하지 말고 적극적으로 질문하세요!",
          "readingTranslation": "When learning Korean, if unfamiliar words appear or the other person speaks too fast, do not panic. Korean people love seeing foreigners make an effort in Korean. If you politely request \"Please speak slowly\" or \"Could you please say it once more?\", anyone will kindly explain again. Do not fear not knowing, and ask questions actively!",
          "comprehensionQuestions": [
            {
              "question": "What should you say when someone speaks too fast in Korean?",
              "answer": "천천히 말씀해 주세요 (Please speak slowly)",
              "explanation": "\"천천히 말씀해 주세요\"라고 정중하게 부탁하면"
            },
            {
              "question": "How do Korean people feel when foreigners try speaking Korean?",
              "answer": "매우 좋아해요 (They like it very much)",
              "explanation": "한국 사람들은 외국인이 한국어로 노력하는 모습을 매우 좋아합니다."
            }
          ],
          "writingPrompt": "Write 4 sentences explaining what you do when you cannot understand Korean words in class or on the street.",
          "writingTemplate": "1. 저는 한국어 수업에서 모르는 단어가 있으면 [행동]을/를 해요.\n2. 선생님께 \"선생님, [요청 문장]\"라고 말해요.\n3. 그리고 사전을 찾아요.\n4. 새로운 단어를 공책에 적고 외워요.",
          "sampleAnswer": "저는 한국어 수업에서 모르는 단어가 있으면 손을 들어요. 선생님께 \"선생님, 다시 한번 천천히 말씀해 주세요\"라고 부탁해요. 그리고 한국어 사전을 찾아서 뜻을 확인해요. 새로운 단어를 단어장에 꼭 적고 매일 복습해요."
        }
      },
      {
        "id": "lesson-16-2",
        "code": "16.2",
        "title": "Putting Your Day Together: Capstone Narrative",
        "koreanTitle": "나의 하루 종합 이야기",
        "situation": "Synthesize Level 1 vocabulary, particles (은/는, 이/가, 을/를, 에, 에서, 의, (으)로), present, past, and future into a connected life story.",
        "location": "Seoul / Everyday Life",
        "pragmaticNote": "Graduating Level 1 signifies full survival competence (A1 proficiency): you can navigate Seoul independently, shop, order food, commute across lines, discuss past events, make appointments, and form authentic personal friendships.",
        "dialogue": [
          {
            "speaker": "Interviewer (면접관)",
            "speakerRole": "SNU Language Institute Examiner",
            "korean": "사라 씨, 1급 과정을 마친 소감이 어때요? 자신에 대해 소개해 보세요.",
            "english": "Sarah, how do you feel finishing the Level 1 course? Please introduce yourself.",
            "notes": "소감 = feelings/impressions; 소개해 보세요 = please introduce."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Level 1 Graduate",
            "korean": "처음에는 한글도 몰랐지만 지금은 한국어로 인사하고 식당에서 주문할 수 있어요.",
            "english": "At first I didn't even know Hangul, but now I can greet in Korean and order food at restaurants.",
            "notes": "주문할 수 있어요 = can order."
          },
          {
            "speaker": "Interviewer (면접관)",
            "speakerRole": "SNU Language Institute Examiner",
            "korean": "한국 생활은 어때요? 어제와 주말에는 무엇을 했어요?",
            "english": "How is life in Korea? What did you do yesterday and over the weekend?",
            "notes": "Comprehensive interview question testing past tense narrative."
          },
          {
            "speaker": "Sarah (사라)",
            "speakerRole": "Level 1 Graduate",
            "korean": "어제는 도서관에서 시험공부를 했고, 지난 주말에는 친구들과 경복궁에 가서 사진을 찍었어요. 내일은 동아리 친구들과 삼겹살을 먹을 거예요!",
            "english": "Yesterday I studied for exams at the library, and last weekend I went to Gyeongbokgung with friends and took photos. Tomorrow I will eat pork belly with club friends!",
            "notes": "Integrated use of past, present, and future."
          },
          {
            "speaker": "Interviewer (면접관)",
            "speakerRole": "SNU Language Institute Examiner",
            "korean": "정말 훌륭합니다! 1급 과정을 완벽하게 수료하셨습니다. 축하합니다!",
            "english": "Truly outstanding! You have completely passed the Level 1 course. Congratulations!",
            "notes": "수료하셨습니다 = You have graduated/completed the course."
          }
        ],
        "vocabulary": [
          {
            "id": "v16-2-1",
            "korean": "수료 / 졸업",
            "hanja": "修了 / 卒業",
            "romanization": "suryo / joreop",
            "partOfSpeech": "Noun",
            "english": "course completion / graduation",
            "exampleKorean": "한국어 1급 과정을 성공적으로 수료했어요.",
            "exampleEnglish": "I successfully completed the Level 1 Korean course."
          },
          {
            "id": "v16-2-2",
            "korean": "자신감",
            "hanja": "自信感",
            "romanization": "jasin-gam",
            "partOfSpeech": "Noun",
            "english": "confidence",
            "exampleKorean": "한국어 말하기에 자신감이 생겼어요.",
            "exampleEnglish": "I developed confidence in Korean speaking."
          },
          {
            "id": "v16-2-3",
            "korean": "축하합니다 / 축하해요",
            "hanja": "祝賀",
            "romanization": "chukahamnida / chukahaeyo",
            "partOfSpeech": "Expression",
            "english": "congratulations!",
            "exampleKorean": "1급 완주를 진심으로 축하합니다!",
            "exampleEnglish": "Warmest congratulations on finishing Level 1!"
          }
        ],
        "grammar": [
          {
            "id": "g16-2-1",
            "pattern": "Integrated Level 1 Particle & Tense Matrix",
            "englishMeaning": "Complete mastery of Present, Past, and Future with all 8 core particles",
            "formula": "Present (아요/어요) + Past (았/었어요) + Future ((으)ㄹ 거예요)",
            "explanation": "The ultimate synthesis of beginner Korean communication.",
            "rules": [
              "Topic/Focus: 은/는",
              "Subject identifier: 이/가",
              "Direct object: 을/를",
              "Static location / Time / Destination: 에",
              "Dynamic action place: 에서",
              "Possession: 의",
              "Method/Direction: (으)로",
              "Connector: 하고 / 와 / 과 / 그리고 / 하지만"
            ],
            "examples": [
              {
                "korean": "저는 어제 도서관에서 책을 읽었어요. 그리고 내일은 공원에 갈 거예요.",
                "english": "I read books at the library yesterday. And tomorrow I am going to go to the park.",
                "breakdown": "Integrates past, connectors, location markers, and future intention."
              }
            ]
          }
        ],
        "speakingListening": {
          "id": "d16-2",
          "title": "Level 1 Capstone Synthesis Drills (1급 종합 말하기 연습)",
          "instruction": "Deliver full connected sentences transitioning effortlessly across present, past, and future.",
          "drills": [
            {
              "prompt": "Introduce yourself: I am Sarah, American, and studying Korean.",
              "targetKorean": "저는 사라예요. 미국 사람이고 한국어를 열심히 공부해요.",
              "english": "I am Sarah. I am American and studying Korean diligently.",
              "audioText": "저는 사라예요 미국 사람이고 한국어를 열심히 공부해요"
            },
            {
              "prompt": "State past: Yesterday I went to Hongdae and bought clothes.",
              "targetKorean": "어제 홍대에 가서 옷을 샀어요.",
              "english": "Yesterday I went to Hongdae and bought clothes.",
              "audioText": "어제 홍대에 가서 옷을 샀어요"
            },
            {
              "prompt": "State future: Tomorrow I will go to Busan by KTX train.",
              "targetKorean": "내일은 KTX 기차로 부산에 갈 거예요.",
              "english": "Tomorrow I will go to Busan by KTX train.",
              "audioText": "내일은 KTX 기차로 부산에 갈 거예요"
            },
            {
              "prompt": "Express wish: I want to speak Korean very fluently.",
              "targetKorean": "한국어를 정말 유창하게 잘하고 싶어요.",
              "english": "I want to speak Korean very fluently.",
              "audioText": "한국어를 정말 유창하게 잘하고 싶어요"
            }
          ]
        },
        "readingWriting": {
          "id": "rw16-2",
          "readingTitle": "나의 한국어 성장 일기: 1급을 마치며 (My Korean Growth Diary: Finishing Level 1)",
          "readingPassage": "처음 서울에 왔을 때 저는 한국어를 한마디도 할 수 없었습니다. 하지만 1급 16개 단원을 매일 꾸준히 공부하면서 모든 것이 달라졌습니다. 이제는 혼자서 카페에 가서 아메리카노를 주문하고, 식당에서 좋아하는 찌개를 시킵니다. 지하철 노선도를 보고 원하는 역으로 쉽게 갈 수 있습니다. 어제는 한국인 친구에게 카카오톡 메시지를 한글로 직접 보냈습니다. 다음 2급 과정에서도 포기하지 않고 더욱 열심히 공부할 것입니다!",
          "readingTranslation": "When I first came to Seoul, I could not speak a single word of Korean. However, as I studied the 16 units of Level 1 diligently every day, everything changed. Now, I go to cafes alone and order Americanos, and order my favorite stews at restaurants. Looking at the subway map, I can easily go to my desired station. Yesterday, I directly sent a KakaoTalk message in Hangul to a Korean friend. In the upcoming Level 2 course, I will not give up and will study even harder!",
          "comprehensionQuestions": [
            {
              "question": "What can the writer do alone now at cafes?",
              "answer": "아메리카노를 주문해요 (Order an Americano)",
              "explanation": "혼자서 카페에 가서 아메리카노를 주문하고"
            },
            {
              "question": "What did the writer do yesterday with a Korean friend?",
              "answer": "한글로 카카오톡 메시지를 보냈어요 (Sent a KakaoTalk message in Hangul)",
              "explanation": "어제는 한국인 친구에게 카카오톡 메시지를 한글로 직접 보냈습니다."
            }
          ],
          "writingPrompt": "Write a comprehensive 10-sentence self-introduction and life essay combining your name, nationality, routine, what you did last weekend, and what you will do next week in Korean.",
          "writingTemplate": "1. 안녕하세요? 제 이름은 [이름]입니다.\n2. 저는 [국적] 사람이고 지금 [직업/학생]입니다.\n3. 저는 매일 아침 [시간]에 일어나요.\n4. 낮에는 [장소]에서 한국어를 열심히 공부해요.\n5. 제 취미는 [취미 1]과/와 [취미 2]예요.\n6. 어제는 [장소]에서 친구와 함께 [활동]을/를 했어요.\n7. [음식]도 아주 맛있게 먹었어요.\n8. 다음 주말에는 [장소]에 갈 거예요.\n9. 그곳에서 [활동]을/를 하고 싶어요.\n10. 만나서 정말 반갑습니다!",
          "sampleAnswer": "안녕하세요? 제 이름은 데이비드입니다. 저는 캐나다 사람이고 서울대학교 어학당 학생입니다. 저는 매일 아침 일곱 시 반에 일어나요. 낮에는 어학당 교실에서 한국어를 열심히 공부해요. 제 취미는 음악 감상과 축구예요. 어제는 홍대에서 친구와 함께 쇼핑을 했어요. 따뜻한 김치찌개도 아주 맛있게 먹었어요. 다음 주말에는 KTX 기차를 타고 부산에 갈 거예요. 그곳에서 푸른 바다를 보고 맛있는 해산물을 먹고 싶어요. 만나서 정말 반갑습니다!"
        }
      }
    ]
  }
] as unknown as KoreanUnit[])
];

export const KOREAN_CHECKPOINTS: KoreanCheckpoint[] = [
  {
    "id": "checkpoint-a",
    "checkpointCode": "A",
    "title": "Checkpoint A: Foundations of Reading & Self-Introduction",
    "prerequisites": "Completion of Unit 0, Unit 1, Unit 2, and Unit 3.",
    "targetSkills": [
      "Read and write any basic Hangul word aloud without relying on romanization.",
      "Introduce yourself (name, nationality, occupation) politely using 이에요/예요 and 은/는.",
      "Ask what objects are and clarify using demonstratives (이거, 그거, 저거) and 아니에요.",
      "State what items you have or do not have using 있어요 / 없어요."
    ],
    "spokenSimulation": {
      "scenario": "You meet a new student at the international student lounge at Seoul National University.",
      "prompt": "Greet them, introduce your name, state where you are from, ask what their item is, and confirm whether you have a pen.",
      "sampleKoreanResponse": "안녕하세요! 처음 뵙겠습니다. 저는 사라예요. 미국 사람이에요. 그리고 대학생이에요. 이게 민수 씨 책이에요? 저도 펜이 있어요. 만나서 반갑습니다!",
      "english": "Hello! Pleased to meet you. I am Sarah. I am American. And I am a university student. Is this Min-su's book? I also have a pen. Nice to meet you!"
    },
    "writtenTask": {
      "prompt": "Write a 6-sentence introductory profile for your student club application.",
      "wordCountTarget": "40–60 Korean words",
      "sampleSubmission": "안녕하세요? 제 이름은 데이비드예요. 저는 캐나다 사람이에요. 저는 서울대학교 어학당 학생이에요. 한국어를 열심히 공부해요. 제 가방에 한국어 책과 사전이 있어요. 반갑습니다!"
    }
  },
  {
    "id": "checkpoint-b",
    "checkpointCode": "B",
    "title": "Checkpoint B: Everyday Needs, Shopping & Daily Life",
    "prerequisites": "Completion of Unit 4, Unit 5, Unit 6, Unit 7, and Unit 8.",
    "targetOutcome": "Navigate daily transactions in Seoul: ordering drinks/meals, shopping with Korean numbers and counters, describing locations, routine verbs, and family.",
    "targetSkills": [
      "Order at cafes and Korean restaurants using native counters (한 잔, 두 개, 일 인분) and 주세요.",
      "Ask prices in Korean Won with 얼마예요 and read Sino-Korean sums (만, 천, 백).",
      "State object and building locations with 에 있어요 and spatial nouns (앞, 뒤, 옆, 안).",
      "Conjugate daily verbs in the present tense (아요/어요/해요) and differentiate 에 vs 에서.",
      "Introduce family members and describe people with adjectives and 안 negation."
    ],
    "spokenSimulation": {
      "scenario": "You enter a traditional Korean restaurant in Insadong and order lunch, ask for water, and pay at the counter.",
      "prompt": "Call the server, order 2 bibimbap and 1 cola, ask for water, and ask the cashier how much the total is.",
      "sampleKoreanResponse": "여기요! 비빔밥 두 개하고 콜라 한 캔 주세요. 시원한 물도 좀 주세요. (식사 후) 사장님, 맛있게 먹었습니다. 모두 얼마예요? 카드로 결제할게요.",
      "english": "Over here! Please give us two bibimbap and one can of cola. Please give us cold water too. (After meal) Owner, we ate deliciously. How much is it all together? I will pay by card."
    },
    "writtenTask": {
      "prompt": "Write a 7-sentence descriptive journal entry about your room, daily routine, and what you bought this week.",
      "wordCountTarget": "60–80 Korean words",
      "sampleSubmission": "제 방에 큰 책상과 침대가 있어요. 책상 위에 노트북이 있어요. 저는 매일 아침 도서관에 가요. 도서관에서 한국어를 세 시간 동안 공부해요. 어제는 백화점에서 따뜻한 셔츠 한 벌을 샀어요. 삼만 오천 원이었어요. 그리고 저녁에 가족과 함께 맛있는 밥을 먹었어요."
    }
  },
  {
    "id": "checkpoint-c",
    "checkpointCode": "C",
    "title": "Checkpoint C: Schedules, Hobbies, Past Outings & Weather",
    "prerequisites": "Completion of Unit 9, Unit 10, Unit 11, Unit 12, and Unit 13.",
    "targetOutcome": "Communicate personal narratives: tell the time and calendar dates, arrange appointments, express hobbies and desires (-고 싶어요), recount past experiences (았/었어요), and discuss weather/clothing.",
    "targetSkills": [
      "Tell clock time accurately (Native hours + Sino-Korean minutes) and state schedules with time particle 에.",
      "Read calendar dates with 년, 월, 일 and arrange meetings on specific days of the week (요일).",
      "Express personal hobbies with 을/를 좋아하다/싫어하다 and desires with -고 싶어요.",
      "Recount past events and trips using past tense verb/adjective forms (았어요/었어요/했어요).",
      "Describe weather conditions (덥다, 춥다, 비가 오다) and explain clothing choices."
    ],
    "spokenSimulation": {
      "scenario": "Your classmate asks what you did last weekend, what the weather was like, and what you want to do next weekend.",
      "prompt": "Explain where you went on Saturday, what you ate, how the weather was, and express your desire for next weekend.",
      "sampleKoreanResponse": "지난 토요일에 친구와 함께 한강공원에 갔어요. 날씨가 아주 맑고 따뜻했어요. 공원에서 자전거를 타고 치킨을 맛있게 먹었어요. 정말 재미있었어요! 다음 주말에는 제주도에 여행 가고 싶어요.",
      "english": "Last Saturday, I went to Hangang Park with a friend. The weather was very clear and warm. We rode bicycles in the park and ate chicken deliciously. It was really fun! Next weekend, I want to travel to Jeju Island."
    },
    "writtenTask": {
      "prompt": "Write an 8-sentence diary entry about a memorable day in Korea, including the date, weather, past activities, food eaten, and evening feelings.",
      "wordCountTarget": "80–100 Korean words",
      "sampleSubmission": "2026년 10월 24일 토요일. 오늘 날씨는 하늘이 푸르고 아주 화창했습니다. 저는 아침 아홉 시 반에 일어났습니다. 친구와 함께 경복궁에 갔습니다. 경복궁에서 예쁜 한복을 입고 사진을 많이 찍었습니다. 점심에는 인사동에서 따뜻한 비빔밥을 맛있게 먹었습니다. 음식도 맛있었고 궁궐 경치도 정말 아름다웠습니다. 오늘 하루는 참 행복하고 잊을 수 없는 날이었습니다."
    }
  },
  {
    "id": "checkpoint-d",
    "checkpointCode": "D",
    "title": "Checkpoint D: Integrated Final Assessment (Level 1 Comprehensive Exit Exam)",
    "prerequisites": "Completion of all 16 units (Units 0 through 16).",
    "targetOutcome": "Full Level 1 / CEFR A1 communicative fluency: public transport navigation, invitations, future plans, real-time repair strategies, and comprehensive spoken & written self-presentation.",
    "targetSkills": [
      "Navigate city transit with -(으)로, ask how to get to landmarks, and understand directional guidance.",
      "Formulate future commitments with -(으)ㄹ 거예요 and invite people politely with -(으)ㄹ까요?.",
      "Politely accept or decline invitations with reasoned excuses.",
      "Perform conversational repair (다시 말해 주세요, 천천히 말해 주세요, 모르겠어요).",
      "Synthesize present, past, future, and all beginner particles into an authentic multi-paragraph spoken and written narrative."
    ],
    "spokenSimulation": {
      "scenario": "Official SNU Level 1 Oral Proficiency Interview with a native examiner.",
      "prompt": "Deliver a comprehensive 2-minute spoken introduction covering: name & background, daily schedule, yesterday's outing, directions to your favorite place, and future plans.",
      "sampleKoreanResponse": "안녕하세요? 저는 캐나다에서 온 데이비드라고 합니다. 서울대학교 어학당에서 한국어를 공부하고 있습니다. 저는 보통 아침 일곱 시 반에 일어나서 학교에 갑니다. 어제는 수업이 끝난 후에 명동에 가서 쇼핑을 했습니다. 지하철 4호선으로 갔는데 약 이십 분 걸렸습니다. 옷 한 벌과 신발 한 켤레를 샀습니다. 내일은 동아리 친구들과 잠실야구장에 갈 거예요. 한국어로 대화하는 것이 정말 즐겁고, 앞으로 2급에서도 열심히 공부할 것입니다. 감사합니다!",
      "english": "Hello? I am called David from Canada. I am studying Korean at the SNU Language Education Center. I usually wake up at 7:30 AM and go to school. Yesterday after class finished, I went to Myeongdong and shopped. I went by subway Line 4 and it took about twenty minutes. I bought one outfit and one pair of shoes. Tomorrow I am going to go to Jamsil Baseball Stadium with club friends. Conversing in Korean is truly enjoyable, and I will continue studying hard in Level 2. Thank you!"
    },
    "writtenTask": {
      "prompt": "Write a comprehensive 12-sentence final graduation essay summarizing your life in Korea, routine, past memories, favorite places, and future ambitions.",
      "wordCountTarget": "100–140 Korean words",
      "sampleSubmission": "안녕하세요? 제 이름은 사라입니다. 저는 미국에서 왔고 서울에 살고 있습니다. 한국에 처음 왔을 때는 한글을 읽을 수 없었습니다. 하지만 지금은 한국어로 인사하고 식당에서 맛있는 음식을 주문할 수 있습니다. 저는 아침마다 학교에 가고 도서관에서 친구들과 열심히 공부합니다. 지난 주말에는 부산 해운대에 다녀왔습니다. KTX 기차로 두 시간 반 걸렸습니다. 바다가 정말 아름다웠고 해산물도 맛있게 먹었습니다. 다음 방학에는 제주도에 꼭 여행 가고 싶습니다. 한국어 공부는 아주 흥미롭고 재미있습니다. 1급을 무사히 마치게 되어 매우 기쁩니다."
    }
  }
];
