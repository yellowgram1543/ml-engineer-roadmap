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
];

export const KOREAN_CHECKPOINTS: KoreanCheckpoint[] = [
  {
    id: 'checkpoint-a',
    checkpointCode: 'A',
    title: 'Checkpoint A: Foundations of Reading & Self-Introduction',
    prerequisites: 'Completion of Unit 0, Unit 1, Unit 2, and Unit 3.',
    targetSkills: [
      'Read and write any basic Hangul word aloud without relying on romanization.',
      'Introduce yourself (name, nationality, occupation) politely using 이에요/예요 and 은/는.',
      'Ask what objects are and clarify using demonstratives (이거, 그거, 저거) and 아니에요.',
      'State what items you have or do not have using 있어요 / 없어요.',
    ],
    spokenSimulation: {
      scenario: 'You meet a new student at the international student lounge at Seoul National University.',
      prompt: 'Greet them, introduce your name, state where you are from, ask what their item is, and confirm whether you have a pen.',
      sampleKoreanResponse: '안녕하세요! 처음 뵙겠습니다. 저는 사라예요. 미국 사람이에요. 그리고 대학생이에요. 이게 민수 씨 책이에요? 저도 펜이 있어요. 만나서 반갑습니다!',
      english: 'Hello! Pleased to meet you. I am Sarah. I am American. And I am a university student. Is this Min-su\'s book? I also have a pen. Nice to meet you!',
    },
    writtenTask: {
      prompt: 'Write a 6-sentence introductory profile for your student club application.',
      wordCountTarget: '40–60 Korean words',
      sampleSubmission: '안녕하세요? 제 이름은 데이비드예요. 저는 캐나다 사람이에요. 저는 서울대학교 어학당 학생이에요. 한국어를 열심히 공부해요. 제 가방에 한국어 책과 사전이 있어요. 반갑습니다!',
    },
  },
];
