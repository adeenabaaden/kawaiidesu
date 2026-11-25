export const quizCourses = [
  {
    code: 'WIA1001',
    name: 'Information Systems',
    color: 'bg-navy-600',
    topics: [
      {
        id: 'is-foundations',
        name: 'Foundations of Information Systems',
        questions: [
          {
            id: 'q1',
            prompt: 'Which component of an information system involves the procedures and rules that govern how data is processed?',
            options: ['Hardware', 'Software', 'People', 'Processes'],
            answer: 3,
            explanation: 'Processes are the sequences of steps and rules by which people and technology transform data into useful information. Hardware and software are the technology layer, while people are the users who operate the system.',
          },
          {
            id: 'q2',
            prompt: 'Which of the following best distinguishes data from information?',
            options: [
              'Data is always numeric, while information is always textual',
              'Data are raw facts, while information is processed data with meaning',
              'Information is stored in databases, while data is not',
              'They are interchangeable terms with no practical difference',
            ],
            answer: 1,
            explanation: 'Data are raw, unprocessed facts and figures. Information is data that has been processed, organised and given context so it is meaningful and useful for decision-making.',
          },
          {
            id: 'q3',
            prompt: 'In an organisation, the transactional processing of daily sales records is best described as which type of system?',
            options: ['Management Information System', 'Transaction Processing System', 'Executive Support System', 'Decision Support System'],
            answer: 1,
            explanation: 'A Transaction Processing System (TPS) handles the routine, high-volume recording of daily operational transactions such as sales, orders and payments.',
          },
          {
            id: 'q4',
            prompt: 'Which characteristic is NOT typically associated with quality information?',
            options: ['Timeliness', 'Relevance', 'Ambiguity', 'Accuracy'],
            answer: 2,
            explanation: 'Quality information should be accurate, timely, relevant and complete. Ambiguity (unclear or open to multiple interpretations) reduces information quality.',
          },
        ],
      },
      {
        id: 'is-types',
        name: 'Types of Information Systems',
        questions: [
          {
            id: 'q5',
            prompt: 'Which system primarily supports middle managers by summarising transaction data into periodic reports?',
            options: ['Transaction Processing System', 'Management Information System', 'Executive Support System', 'Knowledge Work System'],
            answer: 1,
            explanation: 'A Management Information System (MIS) summarises and reports transaction-level data to support the monitoring, control and decision-making of middle managers.',
          },
          {
            id: 'q6',
            prompt: 'Decision Support Systems are best characterised as systems that:',
            options: [
              'Automate repetitive clerical tasks only',
              'Provide interactive tools and models to support semi-structured decisions',
              'Replace human judgement entirely',
              'Store only historical audit records',
            ],
            answer: 1,
            explanation: 'DSSs combine data, analytical models and interactive interfaces to help managers explore semi-structured problems rather than automating fully structured ones.',
          },
          {
            id: 'q7',
            prompt: 'An Executive Support System is designed mainly to serve:',
            options: ['Front-line clerks', 'Senior executives requiring strategic overviews', 'External customers', 'Hardware maintenance staff'],
            answer: 1,
            explanation: 'ESSs present highly aggregated, graphical dashboards tailored to the strategic information needs of senior executives.',
          },
        ],
      },
      {
        id: 'is-ecommerce',
        name: 'E-Business & Emerging Trends',
        questions: [
          {
            id: 'q8',
            prompt: 'A business selling directly to consumers through its own online store operates a model known as:',
            options: ['B2B', 'B2C', 'C2C', 'G2C'],
            answer: 1,
            explanation: 'Business-to-Consumer (B2C) commerce is where a business sells goods or services directly to individual consumers, such as an online retail store.',
          },
          {
            id: 'q9',
            prompt: 'Which emerging technology is most associated with automating business processes through intelligent software agents?',
            options: ['Robotic Process Automation', 'Manual data entry', 'Batch processing', 'Standalone spreadsheets'],
            answer: 0,
            explanation: 'Robotic Process Automation (RPA) uses software bots to automate repetitive, rule-based business processes by interacting with existing systems.',
          },
          {
            id: 'q10',
            prompt: 'Cloud computing primarily provides information systems benefits through:',
            options: [
              'Eliminating the need for any data governance',
              'On-demand, scalable computing resources delivered over a network',
              'Restricting access to a single physical location',
              'Removing the requirement for system security',
            ],
            answer: 1,
            explanation: 'Cloud computing delivers on-demand, elastic computing resources (compute, storage, services) over a network, offering scalability and reduced infrastructure ownership.',
          },
        ],
      },
    ],
  },
  {
    code: 'WIA3001',
    name: 'Machine Learning',
    color: 'bg-emerald-600',
    topics: [
      {
        id: 'ml-regression',
        name: 'Regression & Gradient Descent',
        questions: [
          {
            id: 'q11',
            prompt: 'In linear regression, what does the cost function measure?',
            options: [
              'The number of training examples',
              'The average squared error between predictions and actual values',
              'The number of features in the model',
              'The learning rate value',
            ],
            answer: 1,
            explanation: 'The cost function (mean squared error) quantifies how far the model\u2019s predictions are from the actual target values on average.',
          },
          {
            id: 'q12',
            prompt: 'Gradient descent updates model parameters in order to:',
            options: [
              'Maximise the cost function',
              'Minimise the cost function',
              'Eliminate the need for a learning rate',
              'Increase the number of features',
            ],
            answer: 1,
            explanation: 'Gradient descent iteratively moves parameters in the direction that reduces the cost function, following the negative gradient.',
          },
          {
            id: 'q13',
            prompt: 'A learning rate that is too large in gradient descent most likely causes:',
            options: [
              'Slow but stable convergence',
              'Overshooting and divergence of the cost function',
              'Automatic feature selection',
              'Perfect generalisation',
            ],
            answer: 1,
            explanation: 'Too large a step size causes the updates to overshoot the minimum, often leading the cost to increase or oscillate instead of converging.',
          },
        ],
      },
      {
        id: 'ml-classification',
        name: 'Classification & Regularisation',
        questions: [
          {
            id: 'q14',
            prompt: 'Logistic regression is primarily used for:',
            options: ['Continuous numeric prediction', 'Binary classification', 'Clustering unlabelled data', 'Dimensionality reduction'],
            answer: 1,
            explanation: 'Logistic regression applies a sigmoid function to produce probabilities for binary (two-class) classification problems.',
          },
          {
            id: 'q15',
            prompt: 'Which technique most directly reduces overfitting by penalising large coefficients?',
            options: ['Adding more features', 'L2 regularisation (ridge)', 'Increasing polynomial degree', 'Removing the validation set'],
            answer: 1,
            explanation: 'L2 regularisation adds a penalty proportional to the squared magnitude of coefficients, discouraging large weights and reducing overfitting.',
          },
          {
            id: 'q16',
            prompt: 'A confusion matrix for a binary classifier shows 40 true positives, 10 false negatives, 5 false positives and 45 true negatives. What is the recall?',
            options: ['0.80', '0.89', '0.90', '0.50'],
            answer: 0,
            explanation: 'Recall = TP / (TP + FN) = 40 / (40 + 10) = 40/50 = 0.80. It measures how many actual positives were correctly identified.',
          },
        ],
      },
    ],
  },
  {
    code: 'WIX3007',
    name: 'Database Systems',
    color: 'bg-gold-500',
    topics: [
      {
        id: 'db-normalisation',
        name: 'Normalisation & SQL',
        questions: [
          {
            id: 'q17',
            prompt: 'A relation is in Second Normal Form (2NF) if it is in 1NF and:',
            options: [
              'It has no transitive dependencies',
              'Every non-key attribute is fully functionally dependent on the whole primary key',
              'All attributes are atomic',
              'It contains no foreign keys',
            ],
            answer: 1,
            explanation: '2NF removes partial dependencies: every non-key attribute must depend on the entire primary key, not just part of a composite key.',
          },
          {
            id: 'q18',
            prompt: 'BCNF differs from 3NF in that BCNF requires:',
            options: [
              'Every determinant to be a candidate key',
              'All tables to be denormalised',
              'No primary keys at all',
              'Every attribute to be indexed',
            ],
            answer: 0,
            explanation: 'BCNF strengthens 3NF by requiring that every determinant (left-hand side of a functional dependency) be a candidate key.',
          },
          {
            id: 'q19',
            prompt: 'Which SQL clause is used to filter rows after grouping with GROUP BY?',
            options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
            answer: 1,
            explanation: 'WHERE filters rows before grouping, while HAVING filters groups after aggregation by GROUP BY.',
          },
        ],
      },
      {
        id: 'db-transactions',
        name: 'Transactions & Indexing',
        questions: [
          {
            id: 'q20',
            prompt: 'Which property of ACID ensures that a transaction is completed entirely or not at all?',
            options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
            answer: 0,
            explanation: 'Atomicity guarantees all-or-nothing execution: either every operation in the transaction succeeds or the whole transaction is rolled back.',
          },
          {
            id: 'q21',
            prompt: 'A database index is primarily used to:',
            options: [
              'Enforce referential integrity',
              'Speed up data retrieval on indexed columns',
              'Store duplicate copies of all tables',
              'Back up the database automatically',
            ],
            answer: 1,
            explanation: 'Indexes provide fast lookup structures (such as B-trees) that reduce the cost of searching rows on the indexed columns.',
          },
        ],
      },
    ],
  },
  {
    code: 'WIA3002',
    name: 'AI & Knowledge Representation',
    color: 'bg-violet-700',
    topics: [
      {
        id: 'ai-logic',
        name: 'Logic & Inference',
        questions: [
          {
            id: 'q22',
            prompt: 'In propositional logic, the rule of modus ponens states that from P and (P → Q) we can infer:',
            options: ['P', 'Q', '¬Q', '¬P'],
            answer: 1,
            explanation: 'Modus ponens allows inferring Q from the premises P and P → Q, since P being true forces the consequent Q to be true.',
          },
          {
            id: 'q23',
            prompt: 'In a Bayesian network, an edge from node A to node B represents:',
            options: [
              'A causal or probabilistic dependence of B on A',
              'That A and B are always independent',
              'A syntax error',
              'That B is a candidate key',
            ],
            answer: 0,
            explanation: 'A directed edge A → B encodes that B is conditionally dependent on A, represented by B\u2019s conditional probability table given its parents.',
          },
        ],
      },
      {
        id: 'ai-search',
        name: 'Search Algorithms',
        questions: [
          {
            id: 'q24',
            prompt: 'A* search is guaranteed to find an optimal path when its heuristic is:',
            options: ['Admissible and consistent', 'Always zero', 'Larger than the true cost', 'Randomly chosen'],
            answer: 0,
            explanation: 'A* is optimal when the heuristic never overestimates the true cost (admissible); consistency further guarantees optimality without reopening nodes.',
          },
          {
            id: 'q25',
            prompt: 'Which search strategy explores nodes level by level and guarantees the shortest path in an unweighted graph?',
            options: ['Depth-first search', 'Breadth-first search', 'Greedy best-first search', 'Hill climbing'],
            answer: 1,
            explanation: 'Breadth-first search expands nodes in order of depth, so in an unweighted graph the first time a goal is reached it is via a shortest path.',
          },
        ],
      },
    ],
  },
]

export const achievements = [
  { id: 'first-quiz', label: 'First Steps', description: 'Complete your first quiz', icon: 'Flag', xp: 20 },
  { id: 'perfect', label: 'Flawless', description: 'Score 100% on a quiz', icon: 'Award', xp: 50 },
  { id: 'ten-correct', label: 'Getting Warm', description: 'Answer 10 questions correctly', icon: 'Flame', xp: 30 },
  { id: 'streak-3', label: 'On a Roll', description: 'Maintain a 3-day revision streak', icon: 'CalendarCheck', xp: 40 },
  { id: 'all-courses', label: 'Well-Rounded', description: 'Attempt a quiz in every course', icon: 'Layers', xp: 60 },
  { id: 'five-quizzes', label: 'Committed', description: 'Complete 5 quizzes', icon: 'Trophy', xp: 80 },
]

export const xpLevels = [
  { level: 1, title: 'Novice', min: 0 },
  { level: 2, title: 'Apprentice', min: 100 },
  { level: 3, title: 'Scholar', min: 250 },
  { level: 4, title: 'Adept', min: 450 },
  { level: 5, title: 'Expert', min: 700 },
  { level: 6, title: 'Master', min: 1000 },
]

export function levelForXp(xp) {
  let current = xpLevels[0]
  for (const l of xpLevels) if (xp >= l.min) current = l
  const next = xpLevels.find((l) => l.min > xp)
  return {
    ...current,
    next,
    progress: next ? Math.round(((xp - current.min) / (next.min - current.min)) * 100) : 100,
    xpToNext: next ? next.min - xp : 0,
  }
}

export function questionsFor(courseCode, topicId) {
  const course = quizCourses.find((c) => c.code === courseCode)
  if (!course) return []
  if (!topicId) return course.topics.flatMap((t) => t.questions.map((q) => ({ ...q, topic: t.name })))
  const topic = course.topics.find((t) => t.id === topicId)
  return topic ? topic.questions.map((q) => ({ ...q, topic: topic.name })) : []
}