export interface KoreanDialogueLine {
  speaker: string;
  speakerRole?: string; // e.g. "직원 (Staff)", "손님 (Customer)", "민수", "지연"
  korean: string;
  english: string;
  notes?: string;
}

export interface KoreanDialogue {
  id: string;
  levelBadge: string;
  title: string;
  koreanTitle: string;
  situation: string;
  location: string;
  lines: KoreanDialogueLine[];
}

export interface KoreanVocabularyItem {
  id: string;
  levelBadge: string;
  korean: string;
  hanja?: string;
  romanization: string;
  partOfSpeech: 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Expression' | 'Particle';
  english: string;
  exampleKorean: string;
  exampleEnglish: string;
}

export const KOREAN_DIALOGUES: Record<string, KoreanDialogue[]> = {
  '0': [
    {
      id: 'd0-1',
      levelBadge: '0',
      title: 'Sound-Change Rules in Action: Ordering Bread',
      koreanTitle: '음운 변동 실전: 빵집에서',
      situation: 'Practicing liaison (연음) and nasalisation (비음화) in natural speech at a bakery.',
      location: 'Bakery in Hongdae (홍대 빵집)',
      lines: [
        {
          speaker: '손님',
          speakerRole: 'Customer',
          korean: '이 꽃빵 [꼳빵] 얼마예요?',
          english: 'How much is this flower bun?',
          notes: '꽃 [꼳] undergoes syllable-final neutralization to [ㄷ] before 빵.',
        },
        {
          speaker: '직원',
          speakerRole: 'Baker',
          korean: '꽃빵은 천 오백 원이에요. 국물 [궁물] 도 드릴까요?',
          english: 'The flower bun is 1,500 won. Shall I also give you some soup broth?',
          notes: '국물 [궁물] undergoes nasalisation (ㄱ + ㅁ -> ㅇ + ㅁ).',
        },
        {
          speaker: '손님',
          speakerRole: 'Customer',
          korean: '네, 감사합니다 [감사함니다]!',
          english: 'Yes, thank you!',
          notes: '감사합니다 is pronounced [감사함니다] via nasalisation (ㅂ + ㄴ -> ㅁ + ㄴ).',
        },
      ],
    },
  ],
  '1': [
    {
      id: 'd1-1',
      levelBadge: '1',
      title: 'At the Cafe: Ordering Iced Americano',
      koreanTitle: '카페에서: 아이스 아메리카노 주문하기',
      situation: 'Ordering coffee, specifying temperature and cup size, paying by card.',
      location: 'Mega Coffee, Gangnam (강남 메가커피)',
      lines: [
        {
          speaker: '직원',
          speakerRole: 'Barista',
          korean: '어서 오세요! 주문 도와드릴까요?',
          english: 'Welcome! May I help you with your order?',
        },
        {
          speaker: '민수',
          speakerRole: 'Customer',
          korean: '아이스 아메리카노 한 잔이랑 따뜻한 카페라떼 한 잔 주세요.',
          english: 'Please give me one iced Americano and one warm cafe latte.',
          notes: '한 잔 (counter for cups) + 이랑 (and) + 주세요 (please give).',
        },
        {
          speaker: '직원',
          speakerRole: 'Barista',
          korean: '매장에서 드시고 가세요, 아니면 포장이세요?',
          english: 'Will you be having it here in the shop, or is it for takeout?',
        },
        {
          speaker: '민수',
          speakerRole: 'Customer',
          korean: '포장해 주세요. 카드로 결제할게요.',
          english: 'Takeout, please. I will pay by card.',
          notes: '포장해 주세요 (takeout please) + -(으)ㄹ게요 (speaker intention).',
        },
        {
          speaker: '직원',
          speakerRole: 'Barista',
          korean: '영수증 필요하세요?',
          english: 'Do you need a receipt?',
        },
        {
          speaker: '민수',
          speakerRole: 'Customer',
          korean: '아니요, 버려 주세요. 감사합니다.',
          english: 'No, please discard it. Thank you.',
        },
      ],
    },
    {
      id: 'd1-2',
      levelBadge: '1',
      title: 'Asking for Directions at the Subway Station',
      koreanTitle: '지하철역에서: 길 묻기',
      situation: 'Navigating Seoul subway lines and finding the correct exit.',
      location: 'Line 2 City Hall Station (시청역)',
      lines: [
        {
          speaker: '여행자',
          speakerRole: 'Traveler',
          korean: '저기요, 실례지만 덕수궁으로 가려면 몇 번 출구로 나가야 해요?',
          english: 'Excuse me, but if I want to go to Deoksugung Palace, which exit should I take?',
          notes: '-(으)려면 (if one intends to) + -(으)로 (towards).',
        },
        {
          speaker: '역무원',
          speakerRole: 'Station Staff',
          korean: '1번 출구로 나가셔서 오른쪽으로 50미터만 직진하세요.',
          english: 'Go out through Exit 1 and go straight for just 50 meters to your right.',
        },
        {
          speaker: '여행자',
          speakerRole: 'Traveler',
          korean: '여기서 걸어서 얼마나 걸려요?',
          english: 'How long does it take on foot from here?',
        },
        {
          speaker: '역무원',
          speakerRole: 'Station Staff',
          korean: '걸어서 3분 정도 걸려요. 금방이에요.',
          english: 'It takes about 3 minutes on foot. It is very close.',
        },
      ],
    },
  ],
  '2': [
    {
      id: 'd2-1',
      levelBadge: '2',
      title: 'Making Weekend Plans & Irregular Verbs',
      koreanTitle: '주말 약속 잡기와 불규칙 활용',
      situation: 'Friends coordinating weekend plans using irregular verbs (ㅂ, ㄷ, 르).',
      location: 'Hongdae Street (홍대입구)',
      lines: [
        {
          speaker: '지연',
          speakerRole: 'Ji-yeon',
          korean: '민수 씨, 요즘 날씨가 많이 춥지요?',
          english: 'Min-su, the weather is quite cold these days, isn\'t it?',
          notes: '춥다 (ㅂ irregular) -> 추워요 / 춥지요.',
        },
        {
          speaker: '민수',
          speakerRole: 'Min-su',
          korean: '네, 바람이 불어서 정말 추워요. 주말에 뭐 해요?',
          english: 'Yes, because the wind blows it is really cold. What are you doing this weekend?',
        },
        {
          speaker: '지연',
          speakerRole: 'Ji-yeon',
          korean: '집에서 음악을 들으면서 푹 쉬려고 해요.',
          english: 'I plan to get a good rest at home while listening to music.',
          notes: '듣다 (ㄷ irregular) -> 들으면서 (listening).',
        },
        {
          speaker: '민수',
          speakerRole: 'Min-su',
          korean: '저는 친구를 도우러 일찍 일어나야 해요.',
          english: 'I have to wake up early to help a friend.',
          notes: '돕다 (ㅂ irregular) -> 도우러 (in order to help).',
        },
      ],
    },
  ],
  '3': [
    {
      id: 'd3-1',
      levelBadge: '3',
      title: 'Describing a Past Vacation Story',
      koreanTitle: '지난 휴가 경험 이야기하기',
      situation: 'Sharing travel stories with cause-and-effect connectors (-아서/어서 vs -(으)니까).',
      location: 'Hangang Park (한강공원)',
      lines: [
        {
          speaker: '소라',
          speakerRole: 'So-ra',
          korean: '지난주에 제주도 다녀왔지요? 어땠어요?',
          english: 'You visited Jeju Island last week, right? How was it?',
        },
        {
          speaker: '준호',
          speakerRole: 'Jun-ho',
          korean: '비가 너무 많이 와서 한라산에는 못 올라갔어요.',
          english: 'Because it rained so much, I could not climb Hallasan Mountain.',
          notes: '-아서/어서 expresses chronological cause.',
        },
        {
          speaker: '소라',
          speakerRole: 'So-ra',
          korean: '아쉬웠겠어요! 날씨가 흐렸으니까 바다 구경도 힘들었겠네요.',
          english: 'That must have been disappointing! Since the weather was overcast, seeing the ocean must have been difficult too.',
          notes: '-(으)니까 provides justification for the speaker\'s deduction.',
        },
        {
          speaker: '준호',
          speakerRole: 'Jun-ho',
          korean: '그래도 맛있는 흑돼지도 먹고 예쁜 카페도 가서 기분 좋았어요.',
          english: 'Even so, I ate delicious black pork and visited pretty cafes, so I felt great.',
        },
      ],
    },
  ],
  '4': [
    {
      id: 'd4-1',
      levelBadge: '4',
      title: 'Visiting the Clinic & Pharmacy',
      koreanTitle: '병원 진료와 약국 방문',
      situation: 'Explaining physical symptoms to a doctor and picking up a prescription.',
      location: 'Internal Medicine Clinic, Sinchon (신촌 내과의원)',
      lines: [
        {
          speaker: '의사',
          speakerRole: 'Doctor',
          korean: '어디가 불편해서 오셨어요?',
          english: 'Where is causing you discomfort today?',
        },
        {
          speaker: '환자',
          speakerRole: 'Patient',
          korean: '어젯밤부터 열이 나고 목이 따끔거려요. 콧물도 나고요.',
          english: 'Since last night I have had a fever and a stinging throat. My nose is running too.',
          notes: '따끔거리다 (stinging sensation - mimetic verb).',
        },
        {
          speaker: '의사',
          speakerRole: 'Doctor',
          korean: '목이 많이 부었네요. 초기 감기 몸살이에요. 3일 치 약 처방해 드릴게요.',
          english: 'Your throat is quite swollen. It is early-stage cold and body ache. I will prescribe 3 days of medicine.',
        },
        {
          speaker: '약사',
          speakerRole: 'Pharmacist',
          korean: '이 약은 식후 30분에 하루 세 번 드세요. 졸릴 수 있으니 운전은 피하세요.',
          english: 'Take this medicine 30 minutes after meals three times a day. It may make you drowsy so avoid driving.',
        },
      ],
    },
  ],
  '8': [
    {
      id: 'd8-1',
      levelBadge: '8',
      title: 'Office Hearsay and Project Schedule Updates',
      koreanTitle: '사무실 소식 전달과 프로젝트 일정 (-대요 / 간접화법)',
      situation: 'Colleagues updating each other on a meeting outcome using indirect speech and passives.',
      location: 'Corporate Meeting Room, Yeouido (여의도 사무실)',
      lines: [
        {
          speaker: '김 대리',
          speakerRole: 'Assistant Manager Kim',
          korean: '박 팀장님께서 오늘 회의 일정이 다음 주 월요일로 연기되었다고 하셨어요.',
          english: 'Team Lead Park said that today\'s meeting schedule has been postponed to next Monday.',
          notes: '-다고 하셨어요 (honorific reported statement).',
        },
        {
          speaker: '이 주임',
          speakerRole: 'Associate Lee',
          korean: '정말이요? 부장님께서 다음 달까지 기획안을 제출하라고 하셨잖아요.',
          english: 'Really? But the Department Head told us to submit the proposal by next month.',
          notes: '-(으)라고 하셨잖아요 (quoted command).',
        },
        {
          speaker: '김 대리',
          speakerRole: 'Assistant Manager Kim',
          korean: '거래처 시스템이 아직 점검 중이라서 일정이 그렇게 잡혔대요.',
          english: 'They say the schedule was set that way because the client\'s system is still undergoing maintenance.',
          notes: '-대요 (contracted hearsay) + 잡히다 (passive voice).',
        },
        {
          speaker: '이 주임',
          speakerRole: 'Associate Lee',
          korean: '알겠습니다. 그럼 저도 발표 자료를 다시 검토해 보게 되었네요.',
          english: 'Understood. Then it turns out I will also re-examine the presentation deck.',
          notes: '-게 되다 (passive circumstance change).',
        },
      ],
    },
  ],
  '12': [
    {
      id: 'd12-1',
      levelBadge: '12',
      title: 'Discussing Career Decisions using Idioms (사자성어)',
      koreanTitle: '진로 고민과 사자성어 활용',
      situation: 'Mentoring session discussing career choices with 4-character idioms and proverbs.',
      location: 'Gwanghwamun Cafe (광화문)',
      lines: [
        {
          speaker: '선배',
          speakerRole: 'Senior Colleague',
          korean: '새로 시작한 창업 준비는 잘 돼 가? 작심삼일(作心三日)로 끝난 건 아니지?',
          english: 'How is your startup preparation going? It didn\'t end as a three-day resolution, did it?',
          notes: '작심삼일 (giving up after 3 days).',
        },
        {
          speaker: '후배',
          speakerRole: 'Junior',
          korean: '전혀 아닙니다! 일석이조(一石二鳥)의 기회라고 생각하고 밤낮없이 몰두하고 있습니다.',
          english: 'Not at all! Thinking of it as an opportunity to kill two birds with one stone, I am engrossed day and night.',
          notes: '일석이조 (killing two birds with one stone).',
        },
        {
          speaker: '선배',
          speakerRole: 'Senior Colleague',
          korean: '시작이 반이라는 속담도 있잖아. 고진감래(苦盡甘來)니까 지치지 말고 끝까지 밀어붙여 봐.',
          english: 'There is also the proverb that beginning is half the battle. Bitter ends and sweetness arrives, so push through without burning out.',
          notes: '고진감래 (sweet comes after bitter / hard work pays off).',
        },
      ],
    },
  ],
};

export const KOREAN_VOCABULARY: Record<string, KoreanVocabularyItem[]> = {
  '0': [
    {
      id: 'v0-1',
      levelBadge: '0',
      korean: '한글',
      hanja: '韓契',
      romanization: 'han-geul',
      partOfSpeech: 'Noun',
      english: 'Hangeul (the Korean alphabetic writing system)',
      exampleKorean: '훈민정음은 한글의 원래 이름입니다.',
      exampleEnglish: 'Hunminjeongeum is the original name of Hangeul.',
    },
    {
      id: 'v0-2',
      levelBadge: '0',
      korean: '자음',
      hanja: '子音',
      romanization: 'ja-eum',
      partOfSpeech: 'Noun',
      english: 'Consonant',
      exampleKorean: '한글 기본 자음은 14자입니다.',
      exampleEnglish: 'There are 14 basic consonants in Hangeul.',
    },
    {
      id: 'v0-3',
      levelBadge: '0',
      korean: '모음',
      hanja: '母音',
      romanization: 'mo-eum',
      partOfSpeech: 'Noun',
      english: 'Vowel',
      exampleKorean: '한국어 모음은 하늘, 땅, 사람을 본떠 만들었습니다.',
      exampleEnglish: 'Korean vowels were created imitating heaven, earth, and man.',
    },
    {
      id: 'v0-4',
      levelBadge: '0',
      korean: '받침',
      romanization: 'bat-chim',
      partOfSpeech: 'Noun',
      english: 'Final consonant (syllable coda)',
      exampleKorean: '받침 소리에는 7가지 대표음이 있습니다.',
      exampleEnglish: 'There are 7 representative sounds for syllable codas.',
    },
    {
      id: 'v0-5',
      levelBadge: '0',
      korean: '연음',
      hanja: '連音',
      romanization: 'yeon-eum',
      partOfSpeech: 'Noun',
      english: 'Liaison (linking sound between syllables)',
      exampleKorean: '한국어를 읽을 때 연음 규칙을 지켜야 자연스럽습니다.',
      exampleEnglish: 'When reading Korean, following the liaison rule makes you sound natural.',
    },
  ],
  '1': [
    {
      id: 'v1-1',
      levelBadge: '1',
      korean: '안녕하세요',
      romanization: 'an-nyeong-ha-se-yo',
      partOfSpeech: 'Expression',
      english: 'Hello / Good morning / How are you?',
      exampleKorean: '선생님, 안녕하세요!',
      exampleEnglish: 'Teacher, hello!',
    },
    {
      id: 'v1-2',
      levelBadge: '1',
      korean: '감사합니다',
      hanja: '感謝합니다',
      romanization: 'gam-sa-ham-ni-da',
      partOfSpeech: 'Expression',
      english: 'Thank you (formal polite)',
      exampleKorean: '도와주셔서 정말 감사합니다.',
      exampleEnglish: 'Thank you very much for helping me.',
    },
    {
      id: 'v1-3',
      levelBadge: '1',
      korean: '주문하다',
      hanja: '注文하다',
      romanization: 'ju-mun-ha-da',
      partOfSpeech: 'Verb',
      english: 'To order (food, goods)',
      exampleKorean: '여기 커피 두 잔 주문할게요.',
      exampleEnglish: 'I will order two coffees here.',
    },
    {
      id: 'v1-4',
      levelBadge: '1',
      korean: '얼마예요?',
      romanization: 'eol-ma-ye-yo',
      partOfSpeech: 'Expression',
      english: 'How much is it?',
      exampleKorean: '이 사과 한 바구니에 얼마예요?',
      exampleEnglish: 'How much is this basket of apples?',
    },
    {
      id: 'v1-5',
      levelBadge: '1',
      korean: '출구',
      hanja: '出口',
      romanization: 'chul-gu',
      partOfSpeech: 'Noun',
      english: 'Exit, way out',
      exampleKorean: '강남역 2번 출구 앞에서 만나요.',
      exampleEnglish: 'Let\'s meet in front of Exit 2 of Gangnam Station.',
    },
    {
      id: 'v1-6',
      levelBadge: '1',
      korean: '영수증',
      hanja: '領收證',
      romanization: 'yeong-su-jeung',
      partOfSpeech: 'Noun',
      english: 'Receipt',
      exampleKorean: '영수증은 버려 주세요.',
      exampleEnglish: 'Please throw away the receipt.',
    },
    {
      id: 'v1-7',
      levelBadge: '1',
      korean: '어디예요?',
      romanization: 'eo-di-ye-yo',
      partOfSpeech: 'Expression',
      english: 'Where is it?',
      exampleKorean: '화장실이 어디예요?',
      exampleEnglish: 'Where is the restroom?',
    },
  ],
  '2': [
    {
      id: 'v2-1',
      levelBadge: '2',
      korean: '먹다',
      romanization: 'meok-da',
      partOfSpeech: 'Verb',
      english: 'To eat',
      exampleKorean: '점심으로 김치찌개를 먹었어요.',
      exampleEnglish: 'I ate kimchi stew for lunch.',
    },
    {
      id: 'v2-2',
      levelBadge: '2',
      korean: '듣다',
      romanization: 'deut-da',
      partOfSpeech: 'Verb',
      english: 'To listen, to hear (ㄷ irregular)',
      exampleKorean: '한국 노래를 자주 들어요.',
      exampleEnglish: 'I listen to Korean songs often.',
    },
    {
      id: 'v2-3',
      levelBadge: '2',
      korean: '춥다',
      romanization: 'chup-da',
      partOfSpeech: 'Adjective',
      english: 'To be cold (ㅂ irregular)',
      exampleKorean: '겨울이라서 바람이 몹시 추워요.',
      exampleEnglish: 'Because it is winter, the wind is extremely cold.',
    },
    {
      id: 'v2-4',
      levelBadge: '2',
      korean: '빠르다',
      romanization: 'ppa-reu-da',
      partOfSpeech: 'Adjective',
      english: 'To be fast (르 irregular)',
      exampleKorean: 'KTX 기차는 정말 빨라요.',
      exampleEnglish: 'The KTX train is really fast.',
    },
    {
      id: 'v2-5',
      levelBadge: '2',
      korean: '만들다',
      romanization: 'man-deul-da',
      partOfSpeech: 'Verb',
      english: 'To make, to build (ㄹ irregular)',
      exampleKorean: '친구를 위해 저녁을 만들었어요.',
      exampleEnglish: 'I made dinner for my friend.',
    },
  ],
  '3': [
    {
      id: 'v3-1',
      levelBadge: '3',
      korean: '때문에',
      romanization: 'ttae-mun-e',
      partOfSpeech: 'Particle',
      english: 'Because of / due to (noun + 때문에, verb + 기 때문에)',
      exampleKorean: '비 때문에 약속이 취소되었어요.',
      exampleEnglish: 'Because of the rain, the appointment was cancelled.',
    },
    {
      id: 'v3-2',
      levelBadge: '3',
      korean: '약속',
      hanja: '約束',
      romanization: 'yak-sok',
      partOfSpeech: 'Noun',
      english: 'Promise, appointment, plans',
      exampleKorean: '오늘 저녁에 중요한 약속이 있어요.',
      exampleEnglish: 'I have an important appointment this evening.',
    },
    {
      id: 'v3-3',
      levelBadge: '3',
      korean: '올라가다',
      romanization: 'ol-la-ga-da',
      partOfSpeech: 'Verb',
      english: 'To go up, climb',
      exampleKorean: '계단으로 올라가면 엘리베이터가 나옵니다.',
      exampleEnglish: 'If you go up by stairs, the elevator appears.',
    },
    {
      id: 'v3-4',
      levelBadge: '3',
      korean: '도착하다',
      hanja: '到着하다',
      romanization: 'do-chak-ha-da',
      partOfSpeech: 'Verb',
      english: 'To arrive',
      exampleKorean: '서울역에 도착하자마자 전화해 주세요.',
      exampleEnglish: 'Please call me as soon as you arrive at Seoul Station.',
    },
  ],
  '4': [
    {
      id: 'v4-1',
      levelBadge: '4',
      korean: '처방전',
      hanja: '處方箋',
      romanization: 'cheo-bang-jeon',
      partOfSpeech: 'Noun',
      english: 'Medical prescription',
      exampleKorean: '병원에서 받은 처방전을 약국에 제출하세요.',
      exampleEnglish: 'Please submit the prescription you received from the clinic to the pharmacy.',
    },
    {
      id: 'v4-2',
      levelBadge: '4',
      korean: '보증금',
      hanja: '保證金',
      romanization: 'bo-jeung-geum',
      partOfSpeech: 'Noun',
      english: 'Security deposit (housing / lease)',
      exampleKorean: '이 원룸은 보증금 천만 원에 월세 60만 원입니다.',
      exampleEnglish: 'This studio apartment has a 10 million won deposit and 600,000 won monthly rent.',
    },
    {
      id: 'v4-3',
      levelBadge: '4',
      korean: '계좌이체',
      hanja: '計座移替',
      romanization: 'gye-jwa-i-che',
      partOfSpeech: 'Noun',
      english: 'Bank account transfer',
      exampleKorean: '스마트폰 뱅킹 앱으로 계좌이체를 완료했습니다.',
      exampleEnglish: 'I completed the bank transfer using the smartphone banking app.',
    },
    {
      id: 'v4-4',
      levelBadge: '4',
      korean: '증상',
      hanja: '症狀',
      romanization: 'jeung-sang',
      partOfSpeech: 'Noun',
      english: 'Symptom, medical condition',
      exampleKorean: '어떤 증상이 나타나는지 자세히 말씀해 주세요.',
      exampleEnglish: 'Please tell me in detail what symptoms are appearing.',
    },
  ],
  '8': [
    {
      id: 'v8-1',
      levelBadge: '8',
      korean: '전하다',
      hanja: '傳하다',
      romanization: 'jeon-ha-da',
      partOfSpeech: 'Verb',
      english: 'To convey, relay (message/news)',
      exampleKorean: '민수 씨에게 내일 회의 소식을 전해 주세요.',
      exampleEnglish: 'Please convey tomorrow\'s meeting news to Min-su.',
    },
    {
      id: 'v8-2',
      levelBadge: '8',
      korean: '열리다',
      romanization: 'yeol-li-da',
      partOfSpeech: 'Verb',
      english: 'To be opened (passive of 열다)',
      exampleKorean: '바람 때문에 창문이 저절로 열렸어요.',
      exampleEnglish: 'Because of the wind, the window opened by itself.',
    },
    {
      id: 'v8-3',
      levelBadge: '8',
      korean: '늦추다',
      romanization: 'neut-chu-da',
      partOfSpeech: 'Verb',
      english: 'To delay, postpone, slow down (causative of 늦다)',
      exampleKorean: '마감 기한을 이틀 늦추기로 합의했습니다.',
      exampleEnglish: 'We agreed to postpone the deadline by two days.',
    },
    {
      id: 'v8-4',
      levelBadge: '8',
      korean: '주장하다',
      hanja: '主張하다',
      romanization: 'ju-jang-ha-da',
      partOfSpeech: 'Verb',
      english: 'To claim, argue, assert',
      exampleKorean: '그는 자신의 의견이 옳다고 강하게 주장했습니다.',
      exampleEnglish: 'He strongly asserted that his opinion was correct.',
    },
  ],
  '12': [
    {
      id: 'v12-1',
      levelBadge: '12',
      korean: '일석이조',
      hanja: '一石二鳥',
      romanization: 'il-seok-i-jo',
      partOfSpeech: 'Noun',
      english: 'Killing two birds with one stone',
      exampleKorean: '자전거로 출퇴근하면 건강도 챙기고 교통비도 아끼니 일석이조다.',
      exampleEnglish: 'Commuting by bike keeps you healthy and saves transit fare, so it is killing two birds with one stone.',
    },
    {
      id: 'v12-2',
      levelBadge: '12',
      korean: '작심삼일',
      hanja: '作心三日',
      romanization: 'jak-sim-sam-il',
      partOfSpeech: 'Noun',
      english: 'Giving up after three days / short-lived resolve',
      exampleKorean: '새해 다이어트 결심이 작심삼일로 끝나지 않도록 매일 운동해야 한다.',
      exampleEnglish: 'You must exercise every day so your New Year\'s diet resolution does not end as a three-day resolve.',
    },
    {
      id: 'v12-3',
      levelBadge: '12',
      korean: '고진감래',
      hanja: '苦盡甘來',
      romanization: 'go-jin-gam-rae',
      partOfSpeech: 'Noun',
      english: 'Sweetness comes after bitterness / hard work pays off',
      exampleKorean: '오랜 고생 끝에 시험에 합격했으니 고진감래라 할 수 있다.',
      exampleEnglish: 'Passing the exam after prolonged hardship can truly be called sweetness after bitterness.',
    },
    {
      id: 'v12-4',
      levelBadge: '12',
      korean: '두근두근',
      romanization: 'du-geun-du-geun',
      partOfSpeech: 'Adverb',
      english: 'Pit-a-pat / heart thumping (mimetic expression)',
      exampleKorean: '발표 순서가 다가오자 가슴이 두근두근 뛰었다.',
      exampleEnglish: 'As my presentation turn approached, my chest thumped pit-a-pat.',
    },
    {
      id: 'v12-5',
      levelBadge: '12',
      korean: '반짝반짝',
      romanization: 'ban-jjak-ban-jjak',
      partOfSpeech: 'Adverb',
      english: 'Twinkling, sparklingly',
      exampleKorean: '밤하늘에 별들이 반짝반짝 빛나고 있다.',
      exampleEnglish: 'Stars are twinkling sparklingly in the night sky.',
    },
  ],
};

// Helper function to extract only Hangul characters from mixed English-Korean text
export function extractHangulOnly(text: string): string {
  if (!text) return '';
  // Match any Korean Hangul syllable, jamo, and basic punctuation attached to it
  const hangulRegex = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]+(?:[~?!.,\s]+[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]+)*/g;
  const matches = text.match(hangulRegex);
  if (!matches) return '';
  return matches.join(' ').trim();
}

// Check if a text has any Korean Hangul characters
export function hasHangul(text: string): boolean {
  if (!text) return false;
  return /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text);
}
