import { CullenRule, GapFillExercise, LessonModule } from './types';

export const CULLEN_RULES: CullenRule[] = [
  { 
    id: "voc_01", 
    trigger: /\b(plethora|myriad|scintillating)\b/i, 
    response: "We aim for precision, not complexity. These words are often misused. Try 'many' or 'a wide range' depending on context.",
    category: 'vocabulary'
  },
  { 
    id: "cc_01", 
    trigger: /\b(firstly|secondly|finally)\b/i, 
    response: "Avoid mechanical linkers if possible. Use semantic threading to connect ideas more naturally (e.g., 'This issue stems from...').",
    category: 'coherence'
  },
  { 
    id: "tr_01", 
    trigger: /\b(people always|everyone knows|undoubtedly)\b/i, 
    response: "Avoid over-generalization. Academic writing requires nuance. Use hedging language like 'it could be argued that' or 'tend to'.",
    category: 'task_response'
  },
  {
    id: "gr_01",
    trigger: /\b(kids)\b/i,
    response: "'Kids' is too informal for IELTS Task 2. Use 'children' or 'adolescents'.",
    category: 'vocabulary'
  }
];

export const MOCK_EXERCISES: GapFillExercise[] = [
  {
    id: 'ex_01',
    sentence: "It is often argued that _____ spend too much time on screens.",
    gapWord: "children",
    hint: "Formal synonym for 'kids'",
    explanation: "In academic writing, 'children' is preferred over 'kids'."
  },
  {
    id: 'ex_02',
    sentence: "This essay will _____ the causes of this phenomenon.",
    gapWord: "examine",
    hint: "Precise verb meaning to look at closely",
    explanation: "Avoid 'talk about'. 'Examine', 'discuss', or 'analyze' are more precise."
  }
];

export const INITIAL_QUESTIONS = [
  {
    id: 1,
    text: "After a long day, I feel recharged by:",
    options: [
      { label: "Spending time alone", type: "introvert" },
      { label: "Meeting friends", type: "extrovert" },
      { label: "A mix of both", type: "ambivert" }
    ]
  },
  {
    id: 2,
    text: "When learning, I prefer:",
    options: [
      { label: "Quiet deep focus", type: "introvert" },
      { label: "Group discussions/Competition", type: "extrovert" },
      { label: "Flexible environments", type: "ambivert" }
    ]
  }
];

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 'lesson_01',
    title: 'Lesson 1: What Skills Do You Need?',
    description: 'Task Response, Coherence, and the myth of Band 9 templates.',
    slides: [
      // Page 1 Content
      { id: '1.0', type: 'header', content: 'Lesson 1', subContent: ['What skills do you need to show?'] },
      { id: '1.1', type: 'text', content: 'The most common problems in sample answers found online are connected to Task Response and Coherence & Cohesion.' },
      { id: '1.2', type: 'text', content: 'Many of those that claim to be Band 9 actually show Band 6 in these areas.' },
      { id: '1.3', type: 'text', content: 'This might suggest that these criteria are simply poorly understood, but a closer investigation reveals a more complex issue.' },
      { id: '1.4', type: 'text', content: 'The 4 criteria used to assess your answer tell us what the examiner is looking for in your writing.' },
      { id: '1.5', type: 'text', content: 'It is these criteria that make the test as objective as possible; they should be seen as "rules" that you must not try to bend or break.' },
      { id: '1.6', type: 'header', content: 'Key problems at Band 6 (Task Response):' },
      { id: '1.7', type: 'list', content: 'Not addressing all parts of the task equally.', subContent: ['(Addresses all parts, though some may be more fully covered than others)'] },
      { id: '1.8', type: 'list', content: 'Not making your position clear.', subContent: ['(Position is clear throughout from Band 7)'] },
      { id: '1.9', type: 'list', content: 'Not developing and explaining your main ideas.', subContent: ['(Some may be inadequately developed or unclear)'] },
      { id: '1.10', type: 'header', content: 'Key problems at Band 6 (Coherence):' },
      { id: '1.11', type: 'list', content: 'Arranging information coherently but without a clear progression throughout.', subContent: ['(Band 7 requires clear progression)'] },
      { id: '1.12', type: 'list', content: 'Faulty cohesion and referencing.', subContent: ['(Band 6 cohesion within/between sentences may be faulty)'] },
      { id: '1.13', type: 'list', content: 'A lack of a clear central topic in each paragraph.', subContent: ['(This is present from Band 7 onwards)'] },
      { id: '1.14', type: 'text', content: 'Writing Task 2 is a formal discursive essay in which you must "present a fully developed position".' },
      { id: '1.15', type: 'text', content: 'This means clearly explaining your own thoughts and ideas about the issue.' },
      
      // Page 2 Content
      { id: '2.0', type: 'header', content: 'The Definition of "Argument"' },
      { id: '2.1', type: 'text', content: 'In the context of a discursive essay, "argument" means: the reasons you believe something to be true.' },
      { id: '2.2', type: 'text', content: 'Your argument will explain the reasons why you hold the position you claim to hold.' },
      { id: '2.3', type: 'text', content: 'This may mean explaining the reasons WHY you agree or disagree with an idea.' },
      { id: '2.4', type: 'text', content: 'It may mean explaining the reasons WHY you believe the advantages of something outweigh the disadvantages.' },
      { id: '2.5', type: 'text', content: 'Candidates below Band 7 often attempt to explain their reasons...' },
      { id: '2.6', type: 'text', content: '...but these explanations are not always clearly connected to the position they claim to hold.' },
      { id: '2.7', type: 'header', content: 'Why Planning and Critical Thinking are Important' },
      { id: '2.8', type: 'text', content: 'In my view, the issues related to Task Response are due to a lack of thinking and planning.' },
      { id: '2.9', type: 'text', content: 'I suspect some people believe that once your language level is high enough, you no longer need to plan.' },
      { id: '2.10', type: 'text', content: 'The reality is that humans don\'t think in clear, coherent paragraphs or arguments.' },
      { id: '2.11', type: 'text', content: 'You must always engage in critical thinking to sort through your ideas and plan out your argument first.' },
      { id: '2.12', type: 'key-idea', content: 'If you don\'t apply critical thinking to writing task 2, you will not achieve band 7.' },
      { id: '2.13', type: 'key-idea', content: 'If you believe you cannot afford to spend time thinking and planning, you need to be sure you can afford to keep retaking the test.' },

      // Page 3 Content
      { id: '3.0', type: 'header', content: 'Development and Progression' },
      { id: '3.1', type: 'text', content: 'To score Band 6, a candidate must "present a relevant position" although main ideas may be "inadequately developed".' },
      { id: '3.2', type: 'text', content: 'To reach Band 7, candidates must "present a clear position throughout".' },
      { id: '3.3', type: 'text', content: 'For Bands 8 and 9, a "well-developed" or "fully developed" response must be produced.' },
      { id: '3.4', type: 'text', content: 'In terms of Coherence, Band 6 requires "a clear overall sense of progression".' },
      { id: '3.5', type: 'text', content: 'But to reach Bands 7 or above, the progression must be "clear throughout" your essay.' },
      { id: '3.6', type: 'text', content: 'These ideas of progression and development are connected to your argument.' },
      { id: '3.7', type: 'text', content: 'Progression refers to the way that your argument progresses from one main idea to the next.' },
      { id: '3.8', type: 'text', content: 'It can be seen through the way you organize and connect individual ideas to create one complete argument.' },

      // Page 4 Content
      { id: '4.0', type: 'header', content: '1.2 Practising Band 6 Coherence' },
      { id: '4.1', type: 'text', content: 'Some people aim to write in a way that forces the reader (examiner) to infer their main ideas.' },
      { id: '4.2', type: 'text', content: 'If you are writing in this way, you are not meeting the criteria.' },
      { id: '4.3', type: 'text', content: 'Any time there is a lack of a clear central idea in your paragraphs, you are practising staying at Band 6.' },
      { id: '4.4', type: 'text', content: 'Some students want to produce writing like the academic reading passages.' },
      { id: '4.5', type: 'text', content: 'Look at this paragraph from Cambridge IELTS 9...' },
      { id: '4.6', type: 'example', content: 'You might wonder how we can tell whether fossil animals lived on land or in water... Sometimes it\'s obvious. Ichythosaurs were contemporaries of the dinosaurs...' },
      { id: '4.7', type: 'text', content: 'Now read the following version. What do you notice?' },
      { id: '4.8', type: 'example', content: '...Sometimes it\'s obvious. FOR EXAMPLE, Ichythosaurs, WHICH were reptilian... HAD fins... THEIR fossils look like dolphins...' },
      { id: '4.9', type: 'text', content: 'In the second version, I added cohesive devices that make it much easier for the reader to follow the main idea.' },
      { id: '4.10', type: 'text', content: 'The second version is still Band 9.' },
      { id: '4.11', type: 'text', content: 'When we are testing reading, we are assessing ability to understand complex texts, NOT modelling the writing you should produce.' },

      // Page 5 Content
      { id: '5.0', type: 'header', content: 'Are "Firstly, secondly" unnecessary fillers?' },
      { id: '5.1', type: 'text', content: 'Resistance to using clear linking words is persistent.' },
      { id: '5.2', type: 'text', content: 'The answer is NO, it is not a cliché to clearly show how your ideas are connected.' },
      { id: '5.3', type: 'text', content: 'In fact, many academics bemoan the fact that student papers lack the signposting needed to make connections clear.' },
      { id: '5.4', type: 'key-idea', content: 'The language you learn forms an essential toolkit for your writing.' },
      { id: '5.5', type: 'key-idea', content: 'Deciding that some tools should be avoided is like a master builder declaring "I\'d never use a hammer to hit a nail."' },
      { id: '5.6', type: 'key-idea', content: 'A master builder would always use the right tool for the job.' },

      // Page 6 Content
      { id: '6.0', type: 'header', content: '1.3 Under-use of cohesive devices' },
      { id: '6.1', type: 'text', content: 'When native speakers write, they do not always use conjunctions to clearly indicate how ideas are connected.' },
      { id: '6.2', type: 'text', content: 'The link must sometimes be inferred by the reader.' },
      { id: '6.3', type: 'text', content: 'However, adding a connecting word or phrase like "As a result" acts as a clear signpost.' },
      { id: '6.4', type: 'text', content: 'It helps the reader to follow the progress of your argument over several sentences.' },
      { id: '6.5', type: 'example', content: 'People are working longer hours. In addition, they have more job pressures. People willingly place themselves under these unfavorable conditions.' },
      { id: '6.6', type: 'text', content: 'The last two sentences here have no cohesion. In Band 7 descriptors, this is "under-use".' },
      { id: '6.7', type: 'text', content: 'If you fail to explain how ideas are connected, they remain unclear and do not help develop an argument.' },

      // Page 7 Content
      { id: '7.0', type: 'header', content: 'Why do native speakers omit words?' },
      { id: '7.1', type: 'text', content: 'They may omit them to avoid repetition, or to reduce the word count.' },
      { id: '7.2', type: 'text', content: 'Remember, skilled writers are able to link their ideas together in other ways (synonyms, contextual clues).' },
      { id: '7.3', type: 'key-idea', content: 'If you omit clear signposting words, you are forcing the examiner to work harder to follow your argument.' },
      { id: '7.4', type: 'key-idea', content: 'This is not something you should aim for if you are preparing for IELTS writing.' },
      { id: '7.5', type: 'key-idea', content: 'Boosting your score is likely to result in Band 6 Coherence and Cohesion if you make the examiner work.' },

      // Page 9 Content (Lesson 2 Start)
      { id: '9.0', type: 'header', content: 'Lesson 2: A One-Sentence Argument' },
      { id: '9.1', type: 'text', content: 'An argument is defined as a reason (or set of reasons) given in support of an idea or position.' },
      { id: '9.2', type: 'text', content: 'Your essay should present an OVERALL argument, which is itself made up of several shorter arguments.' },
      { id: '9.3', type: 'text', content: 'Each of these shorter arguments must be clearly explained, organised, and linked together to create one whole.' },
      { id: '9.4', type: 'text', content: 'These arguments form the "main ideas" in your essay.' },
      { id: '9.5', type: 'text', content: 'If any of them are unclear, then you cannot present clear progression throughout your essay.' },
      { id: '9.6', type: 'key-idea', content: 'An argument is a statement provided as evidence to show that another statement, the conclusion, is true.' },
      { id: '9.7', type: 'key-idea', content: 'The main ideas or points in your body paragraphs should present this type of argument.' },
      
      // Page 10 Content
      { id: '10.0', type: 'header', content: 'Points to notice' },
      { id: '10.1', type: 'text', content: 'The conclusion does not always come after the reasons.' },
      { id: '10.2', type: 'example', content: 'The government should encourage everyone to eat more fruit because it contains vitamin C, which is good for the health.' },
      { id: '10.3', type: 'text', content: 'Each reason in this argument is called a "premise" - a claim being made by the writer.' },
      { id: '10.4', type: 'text', content: 'When you are writing, you need to make sure that your claims are true (or at least believable).' },
      { id: '10.5', type: 'text', content: 'You are giving your position every time you make an argument like this.' },
      { id: '10.6', type: 'text', content: 'You do not need to write "I believe" or "In my view" to make your position clear.' },
      { id: '10.7', type: 'key-idea', content: 'Whether your position remains clear or not will depend on the language you use, and the reasons you provide to support it.' },
      { id: '10.8', type: 'key-idea', content: 'Writing "In my view" at the beginning of your essay is not enough to make your position clear throughout.' },

      // Page 11 Content
      { id: '11.0', type: 'header', content: '2.2 Reasoning Problems' },
      { id: '11.1', type: 'text', content: 'An argument or idea can remain unclear even if the language used is accurate.' },
      { id: '11.2', type: 'text', content: 'A great deal of Band 6 writing contains confusing arguments rather than clear, valid ones.' },
      { id: '11.3', type: 'text', content: 'The first is making a point but not providing any reason for believing it.' },
      { id: '11.4', type: 'example', content: '"The government should encourage everyone to eat more fruit."' },
      { id: '11.5', type: 'text', content: 'The reader needs to know how you know this or why you believe it.' },
      { id: '11.6', type: 'text', content: 'The second problem occurs when the evidence is not logically connected to the conclusion.' },
      { id: '11.7', type: 'example', content: '"The government should encourage everyone to eat more fruit. For example, a BBC documentary showed that 85% of people eat fruit."' },
      { id: '11.8', type: 'text', content: 'This invented fact does not explain the point or add support to help us believe it.' },
    ]
  }
];