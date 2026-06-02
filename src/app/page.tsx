'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Code, 
  Database, 
  Cloud, 
  Zap,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

// 型定義
interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
  category: 'automation' | 'blockchain' | 'web' | 'ai' | 'saas';
  featured: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'infrastructure' | 'database' | 'tools';
  years: number;
  scope: string;
  evidence: string;
}

// データ
const profileData = {
  name: 'Shuhei HIROSHIMA',
  title: 'フルサイクルエンジニア｜設計からAI・クラウド基盤まで一人で完結',
  location: '新潟県（フルリモート対応）',
  description: '要件整理・DB設計・API実装・クラウド基盤構築・AI機能のPoC――バックエンド開発の全工程を1人で完結できるフリーランスエンジニア。金融機関向けSaaS開発ではアーキテクトとして全APIドメインの設計からAzureインフラ構築、AIエージェント実装まで推進。iOSアプリやChrome拡張のストア公開実績も持ち、「作って終わり」ではなくプロダクトとして届けるところまで担います。',
  email: 'tumutrading2020@gmail.com'
};

const skills: Skill[] = [
  // Backend
  { name: 'Java', level: 4, category: 'backend', years: 4, scope: '業務APIの設計・実装・改修', evidence: '金融機関向けSaaS、仮想通貨ウォレット、学術DBでサーバサイド開発を担当' },
  { name: 'Spring Boot', level: 4, category: 'backend', years: 4, scope: 'REST API、ドメイン設計、保守運用', evidence: '遺言信託SaaSで案件管理・財産管理・相続人管理など複数APIドメインを設計' },
  { name: 'Node.js', level: 4, category: 'backend', years: 4, scope: '外部API連携・自動化処理', evidence: 'EC運営自動化、Chrome拡張、PDF収集CLI、仮想通貨関連処理で利用' },
  { name: 'Python', level: 3, category: 'backend', years: 3, scope: 'AI機能PoC・データ処理', evidence: 'Azure OpenAI / Speech Service連携、音声文字起こし・要約・案文生成の検証を担当' },

  // Frontend
  { name: 'JavaScript', level: 4, category: 'frontend', years: 4, scope: '画面実装・ブラウザ拡張・業務ツール', evidence: 'Chrome Web Store公開済み拡張、管理画面、各種自動化ツールで利用' },
  { name: 'React', level: 3, category: 'frontend', years: 1, scope: '業務画面の実装・API接続', evidence: '金融機関向けSaaSのフロントエンド実装とポートフォリオサイトで利用' },
  { name: 'Vue.js', level: 4, category: 'frontend', years: 3, scope: '既存画面改修・UI改善', evidence: '学術向け画像解析DBなどでUI改善・外部DB連携画面を担当' },
  { name: 'HTML5', level: 3, category: 'frontend', years: 3, scope: 'レスポンシブなWeb画面構築', evidence: 'LP、業務画面、個人プロダクトで使用' },
  { name: 'CSS3', level: 3, category: 'frontend', years: 3, scope: 'UI調整・ランディングページ制作', evidence: 'Tailwind CSSを含むWebページ制作、LP改善で使用' },

  // Infrastructure
  { name: 'Azure', level: 4, category: 'infrastructure', years: 1, scope: 'クラウド基盤構築・運用', evidence: 'App Service、Static Web Apps、Azure Functions、PostgreSQL、Blob Storage、Azure OpenAIを構築' },
  { name: 'AWS', level: 3, category: 'infrastructure', years: 3, scope: 'サーバーレス処理・監視', evidence: 'AWS Lambda / DynamoDBを用いた仮想通貨ウォレット、SNS、Parameter Store連携を経験' },
  { name: 'Docker', level: 3, category: 'infrastructure', years: 2, scope: '開発環境整備・実行環境の再現性確保', evidence: 'Spring Boot / DB構成のローカル環境、チーム開発環境で利用' },
  { name: 'Linux', level: 3, category: 'infrastructure', years: 3, scope: 'CLI操作・ログ確認・デプロイ作業', evidence: 'Webアプリ運用、CI/CD、クラウド環境の調査と保守で使用' },

  // Database
  { name: 'PostgreSQL', level: 4, category: 'database', years: 1, scope: 'テーブル設計・SQL実装・マイグレーション', evidence: '金融機関向けSaaSでAzure Database for PostgreSQLとFlywayを利用' },
  { name: 'MySQL', level: 4, category: 'database', years: 4, scope: '既存DB改修・外部DB連携', evidence: '学術向け画像解析DB、EC関連データ処理で利用' },
  { name: 'DynamoDB', level: 3, category: 'database', years: 2, scope: 'サーバーレス構成のデータ管理', evidence: '仮想通貨ウォレットのアドレス・残高・取引監視データで利用' },

  // Tools
  { name: 'Git', level: 4, category: 'tools', years: 4, scope: 'ブランチ運用・差分管理・レビュー対応', evidence: '業務委託案件と個人プロダクトの継続開発で日常的に利用' },
  { name: 'GitHub', level: 4, category: 'tools', years: 4, scope: 'Issue管理・PR運用・CI/CD', evidence: 'GitHub Actionsによる自動デプロイ、PRベースの開発で利用' },
  { name: 'Claude Code', level: 4, category: 'tools', years: 1, scope: 'AI支援による実装・調査・リファクタリング', evidence: 'ブラウザゲーム、業務支援AIエージェント、既存コード調査で活用' },
  { name: 'Cursor', level: 3, category: 'tools', years: 1, scope: 'AI支援開発・プロトタイピング', evidence: '小規模アプリ開発と既存コードの改善で利用' },
  { name: 'OpenAPI / Swagger', level: 4, category: 'tools', years: 2, scope: 'API仕様整理・フロントエンド連携', evidence: '金融機関向けSaaSでAPI仕様の確認、疎通、実装調整に利用' }
];

const projects: Project[] = [
  {
    id: 'legaltech-saas',
    title: '金融機関向け遺言信託業務支援SaaS',
    description: '遺言信託業務を担う金融機関向けのSaaS型業務支援システムの新規開発。バックエンドアーキテクトとして、案件管理・財産管理・相続人管理・面談記録・協議書生成など全APIドメインの設計・実装を担当。Azureクラウド基盤の構築、AI機能（音声文字起こし・ライブ要約・案文自動生成）のPoC、業務支援AIエージェントの設計・実装まで幅広く推進。チーム4名 / 全体7名。',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Python', 'React', 'Azure Functions', 'Azure OpenAI', 'Docker'],
    category: 'saas',
    featured: true
  },
  {
    id: 'mydrip',
    title: 'MyDrip - ファッションビジュアルブックマーク',
    description: 'ファッション好きのためのChrome拡張機能。オンラインストアで見つけたアイテムを、画像の自動取得と価格情報とともに保存・整理できるビジュアルブックマーク。',
    tech: ['Chrome Extension', 'JavaScript'],
    url: 'https://chromewebstore.google.com/detail/mydrip/ooeohoiabiiimfocifeojoglklcgnefj?hl=ja',
    category: 'web',
    featured: true
  },
  {
    id: 'nl27sd-trainer',
    title: 'No Limit 2-7 Single Draw Trainer',
    description: 'No Limit 2-7 Single Draw ポーカーに特化したトレーニングアプリ。実践形式の練習、リアルタイムのフィードバック、分析機能を通じて、意思決定力の向上を支援。',
    tech: ['Next.js', 'TypeScript', 'Vercel'],
    url: 'https://2-7sdtrainer.vercel.app/',
    category: 'web',
    featured: true
  },
  {
    id: 'jpy-to-krw',
    title: 'JPY to KRW - 日本円↔韓国ウォン換算アプリ',
    description: 'リアルタイム為替レートを取得し、日本円と韓国ウォンを即座に換算できるiOSアプリ。電卓風のキーパッドUIでシンプルに操作可能。Flutterで開発し、App Storeにて公開中。',
    tech: ['Flutter', 'Dart', 'iOS'],
    url: 'https://apps.apple.com/jp/app/jpy-to-krw/id6766007368',
    category: 'web',
    featured: true
  },
  {
    id: 'crypto-wallet',
    title: '仮想通貨ウォレットシステム',
    description: 'AWS Lambda上で動作するサーバーレス仮想通貨ウォレット。Bitcoin・Ethereum両通貨対応のマルチウォレット機能。ブロックチェーン取引監視、アドレス管理、残高管理を自動化。',
    tech: ['Node.js', 'AWS Lambda', 'DynamoDB', 'Bitcoin Core RPC', 'Web3.js'],
    category: 'blockchain',
    featured: true
  },
  {
    id: 'academic-db',
    title: '学術向け画像解析データベース',
    description: '学術研究用の画像解析データベースシステム。外部DB連携、データ整合性向上、UI改善を担当。研究者の効率的なデータ活用を支援。',
    tech: ['Java', 'Spring Boot', 'Vue.js', 'MySQL', 'Docker'],
    category: 'web',
    featured: true
  },
  {
  id: 'dr-teals-epsom-salt-lp',
  title: 'Dr.Teal\'s エプソムソルトLP',
  description: 'A8.netアフィリエイト向けランディングページ。医薬部外品の効能訴求と感情に訴えるデザインでCVR向上を実現。',
  tech: ['Astro', 'Tailwind CSS', 'TypeScript', 'Cloudflare Pages'],
  url: 'https://epsom-salt.pages.dev/',
  category: 'web',
  featured: false
},
    {
    id: 'portfolio-site',
    title: 'ポートフォリオサイト（当サイト）',
    description: 'Next.js + TypeScript + Tailwind CSSで構築したモダンなポートフォリオサイト。レスポンシブデザイン、アニメーション効果、GitHub Actions自動デプロイを実装。',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions'],
    github: 'https://github.com/shupopo/portfolio',
    category: 'web',
    featured: false
  },
  {
    id: 'ec-automation',
    title: 'ECサイト運営自動化ツール',
    description: '自身が運営するAmazon、Yahoo Shopping、au PAYマーケット向けの業務自動化システム。商品リサーチ、出品、価格管理、在庫管理を完全自動化し、大幅な工数削減を実現。',
    tech: ['Node.js', 'Python', 'Amazon MWS API', 'Yahoo Shopping API', 'Puppeteer'],
    category: 'automation',
    featured: false
  },
  {
    id: 'stock-portfolio-gas',
    title: '株式ポートフォリオ自動管理ツール',
    description: 'J-Quants APIとGoogle Apps Scriptを連携し、Googleスプレッドシート上で日本株の株価・配当・評価額を自動取得・計算するツール。四本値取得、前日比計算、含み損益算出、過去データ蓄積まで一括処理。',
    tech: ['Google Apps Script', 'J-Quants API', 'Google Sheets'],
    category: 'automation',
    featured: false
  },
  {
    id: 'chatbot-rina',
    title: 'LINE社長Botチャットボット',
    description: 'LINE Messaging API × n8n × Difyを連携した業務支援チャットボット。社長のペルソナを持つAIが在庫照会や問い合わせに自然言語で応答。スマレジAPI連携による商品・在庫情報の取得にも対応。',
    tech: ['n8n', 'Dify', 'LINE Messaging API', 'スマレジAPI'],
    category: 'ai',
    featured: false
  },
  {
    id: 'pdf-retriever',
    title: '厚生労働省PDF自動収集ツール',
    description: '厚生労働省ウェブサイトから「化粧品基準」関連の日本語版PDFのみを自動収集し、Google Driveに保存するCLIツール。抽出条件フィルタリング、リトライ機能、メタデータ付与に対応。',
    tech: ['Node.js', 'TypeScript', 'Google Apps Script', 'Cheerio'],
    category: 'automation',
    featured: false
  },
  {
    id: 'shooting-game',
    title: 'シューティングゲーム',
    description: 'Claude Codeを活用したブラウザゲーム開発。最新のAI開発ツールを実際のプロジェクトで活用し、効率的な開発フローを実証。',
    tech: ['JavaScript', 'HTML5 Canvas', 'Claude Code'],
    url: 'https://shupopo.github.io/shooting/',
    github: 'https://github.com/shupopo',
    category: 'ai',
    featured: false
  },
  {
    id: 'tennis-game',
    title: 'テニスゲーム',
    description: 'Claude Codeによるインタラクティブなテニスゲーム。AI支援開発ツールの可能性を探求した実験的プロジェクト。',
    tech: ['JavaScript', 'HTML5 Canvas', 'Claude Code'],
    url: 'https://shupopo.github.io/testfolder/',
    github: 'https://github.com/shupopo',
    category: 'ai',
    featured: false
  },
  {
    id: 'sns-app',
    title: 'Twitter風SNSアプリ',
    description: 'Bubbleを使用したノーコード開発によるSNSアプリ。従来の開発手法との比較検証を通じて、適切な技術選択の重要性を実証。',
    tech: ['Bubble', 'NoCode'],
    url: 'https://sns-84536.bubbleapps.io/version-test',
    category: 'ai',
    featured: false
  },
  {
    id: 'youtube-channel',
    title: 'YouTube音楽チャンネル',
    description: 'Suno AI + Runwayを活用した音楽コンテンツ制作。AI技術を活用したクリエイティブワークフローの構築と運営。',
    tech: ['Suno AI', 'Runway', 'YouTube API'],
    url: 'https://www.youtube.com/@truSands',
    category: 'ai',
    featured: false
  }
];

// コンポーネント
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setIsScrolled(v > 100));
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ backgroundColor: headerBg }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
        >
          Shuhei HIROSHIMA
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {['About', 'Skills', 'Works', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/80 hover:text-white'}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          className={`md:hidden transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
        >
          {['About', 'Skills', 'Works', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/portfolio/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-900/80" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {profileData.name}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 font-medium">
            {profileData.title}
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-100 mb-8">
            <MapPin size={20} />
            <span>{profileData.location}</span>
          </div>
          <p className="text-lg text-blue-50/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            {profileData.description}
          </p>
          <motion.a
            href="#about"
            className="inline-flex items-center space-x-2 bg-white text-blue-700 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>詳細を見る</span>
            <ChevronDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full max-w-3xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/portfolio/images/about-illustration.jpg"
            alt="フルサイクル開発のワークフロー"
            width={1024}
            height={576}
            className="w-full h-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">1人で設計から本番運用まで</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                上場ITコンサルティング企業でのブロックチェーン開発を経て、
                現在はフリーランスとして金融機関向けSaaSの開発に参画。
                4名チームのバックエンド全域を担い、
                20以上のAPIドメイン設計からAzureインフラ構築・運用まで一貫して推進しています。
              </p>
              <p>
                Azure OpenAI・Speech Serviceを活用したAI機能（音声文字起こし・
                ライブ要約・公正証書案文の自動生成）の技術選定からPoC実装まで
                単独で完遂。業務支援AIエージェントの設計・実装も手がけています。
              </p>
              <p>
                個人プロダクトではiOSアプリのApp Store公開、Chrome拡張の
                Web Store公開など、実装だけでなくユーザーに届けるところまで
                一人で完結させた実績があります。
              </p>
              <p>
                Claude Code・Cursor・Codexなど最新のAI開発ツールを導入し、
                少人数でも大きなスコープをカバーする開発体制を構築しています。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-700">APIドメイン設計実績</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">全工程</div>
              <div className="text-gray-700">設計〜インフラ〜AI</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">公開済</div>
              <div className="text-gray-700">App Store / Web Store</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">複数業界</div>
              <div className="text-gray-700">金融・EC・学術・教育</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('backend');
  
  const categories = {
    backend: 'Backend',
    frontend: 'Frontend',
    infrastructure: 'Infrastructure',
    database: 'Database',
    tools: 'Tools'
  };

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/portfolio/images/skills-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/85" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Skills</h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-lg"
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="font-semibold text-white">{skill.name}</h3>
                <span className="shrink-0 text-sm text-blue-300">{skill.years}年</span>
              </div>
              <p className="text-sm font-medium text-blue-300 mb-3">{skill.scope}</p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{skill.evidence}</p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-blue-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.level / 5) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>実務習熟度</span>
                <span>{skill.level}/5</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = {
    all: 'すべて',
    saas: 'SaaS',
    automation: '自動化',
    blockchain: 'ブロックチェーン',
    web: 'Webアプリ',
    ai: 'AI・新技術'
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Works</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/portfolio/images/works-header.jpg"
            alt="プロジェクト実績"
            width={1024}
            height={576}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                project.featured ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {project.featured && (
                <div className="bg-blue-500 text-white text-xs px-3 py-1 text-center">
                  FEATURED
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>View Project</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xandvepa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 hidden lg:block">
        <Image
          src="/portfolio/images/contact-illustration.jpg"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600">
            「設計から実装・インフラまで任せたい」案件のご相談はこちらから
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">こんなお悩みに対応できます</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-600" size={20} />
                <span className="text-gray-700">{profileData.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-600" size={20} />
                <span className="text-gray-700">お問い合わせフォームをご利用ください</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">得意な案件</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• バックエンド設計〜実装〜インフラを一人に任せたい</li>
                <li>• SaaS新規開発でAPI設計から基盤構築まで必要</li>
                <li>• AI機能（生成AI・音声認識等）のPoC〜本番導入</li>
                <li>• 既存業務の自動化・外部API連携ツールの開発</li>
                <li>• iOSアプリ・Chrome拡張などプロダクトの企画〜公開</li>
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                お名前 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                件名 *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                メッセージ *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg mb-6">
                お問い合わせありがとうございます。追って連絡いたします。
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">
                送信に失敗しました。しばらくしてから再度お試しください。
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{profileData.name}</h3>
            <p className="text-gray-400 mb-4">フルサイクルエンジニア</p>
            <p className="text-gray-400 text-sm">
              設計・実装・インフラ・AI を一人で完結。<br />
              少人数チームの推進力になります。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">提供価値</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>設計〜実装〜インフラの一気通貫対応</li>
              <li>AI機能のPoC〜本番導入（Azure OpenAI）</li>
              <li>API設計・OpenAPI仕様によるチーム連携</li>
              <li>プロダクト公開（App Store / Web Store）</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">お問い合わせ</h4>
            <p className="text-gray-400 text-sm mb-4">
              プロジェクトのご相談は<br />
              お気軽にお問い合わせください
            </p>
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm"
            >
              <Mail size={16} />
              <span>お問い合わせフォーム</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 {profileData.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://github.com/shupopo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// メインコンポーネント
const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
