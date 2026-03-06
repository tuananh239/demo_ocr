import React, { useState, useEffect } from 'react';
import { 
  ScanText, 
  Download, 
  Copy, 
  Languages, 
  User,
  FileText,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  CheckCircle2,
  Edit3,
  Eye,
  Zap,
  UploadCloud,
  Code2,
  ChevronDown,
  Menu,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { BatchFile, ExtractedData } from './types';

// Mock Data
const MOCK_FILES: BatchFile[] = [
  { id: '1', name: 'Contract_Scan.pdf', type: 'pdf', status: 'completed' },
  { 
    id: '2', 
    name: 'Invoice_001.jpg', 
    type: 'image', 
    status: 'completed',
    extractedData: {
      invoiceNumber: 'INV-001',
      date: '2023-10-25',
      vendor: 'Tech Solutions Inc',
      totalAmount: '$1,250.00',
      confidence: 'high'
    }
  },
  { id: '3', name: 'Receipt_Scan.png', type: 'image', status: 'completed' },
  { id: '4', name: 'Document_3.pdf', type: 'pdf', status: 'completed' },
];

export default function App() {
  const [view, setView] = useState<'landing' | 'editor'>('landing');
  const [selectedFileId, setSelectedFileId] = useState<string>('2');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const selectedFile = MOCK_FILES.find(f => f.id === selectedFileId) || MOCK_FILES[1];

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-300", isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900")}>
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingPage onStart={() => setView('editor')} />
        ) : (
          <EditorPage 
            files={MOCK_FILES} 
            selectedFile={selectedFile} 
            onSelectFile={setSelectedFileId}
            onBack={() => setView('landing')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#005993] to-[#d71249] shadow-md">
        <div className="flex items-center gap-3 text-white">
          <ScanText className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">OCR Pro</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-white/90">
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Tools</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">History</a>
          <a href="#" className="text-sm font-medium hover:text-white transition-colors">Pricing</a>
          <div className="flex gap-3 ml-4">
            <button className="px-5 py-2 text-sm font-bold border border-white/30 rounded-lg hover:bg-white/10 transition-colors">Log In</button>
            <button className="px-5 py-2 text-sm font-bold bg-white text-[#005993] rounded-lg hover:bg-slate-100 transition-colors">Sign Up</button>
          </div>
        </nav>
        <button className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl font-black tracking-tight mb-6 leading-tight">
            Convert Invoices & Documents <br /> to Data
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Fast, accurate, and secure OCR software for professionals. Extract structured data instantly.
          </p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-gradient-to-br from-[#005993]/5 to-[#d71249]/5 dark:from-[#005993]/10 dark:to-[#d71249]/10 border-2 border-dashed border-[#005993]/30 rounded-2xl p-16 flex flex-col items-center gap-6 cursor-pointer hover:border-[#005993]/50 transition-all group shadow-sm"
        >
          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-md flex items-center justify-center text-[#005993] group-hover:scale-110 transition-transform">
            <UploadCloud className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Drag & Drop Files Here</h3>
            <p className="text-slate-500 dark:text-slate-400">or click to browse from your computer</p>
          </div>
          <button className="mt-4 px-10 py-4 bg-[#005993] text-white font-bold rounded-xl hover:bg-[#004b7a] transition-colors shadow-lg shadow-[#005993]/20">
            Select File
          </button>
        </motion.div>

        <div className="flex gap-6 mt-6 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d71249]" /> JPG, PNG, PDF</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#d71249]" /> Max 50MB</span>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-end gap-4 w-full justify-center">
          <div className="flex flex-col items-start w-full sm:w-72">
            <label className="text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Document Language</label>
            <div className="relative w-full">
              <select className="w-full h-14 pl-4 pr-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl appearance-none focus:ring-2 focus:ring-[#005993] outline-none">
                <option>English</option>
                <option>Vietnamese</option>
                <option>French</option>
                <option>German</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <button 
            onClick={onStart}
            className="h-14 px-10 bg-[#005993] text-white font-bold rounded-xl hover:bg-[#004b7a] transition-all flex items-center gap-2 shadow-lg shadow-[#005993]/20"
          >
            <Zap className="w-5 h-5" />
            Start OCR
          </button>
        </div>

        <div className="mt-24 w-full border-t border-slate-200 dark:border-slate-800 pt-16">
          <h3 className="text-3xl font-bold mb-12">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: UploadCloud, title: "1. Upload File", desc: "Drag and drop your invoices or documents into the upload zone." },
              { icon: Languages, title: "2. Select Language", desc: "Choose the language of the text in your document for optimal accuracy." },
              { icon: Code2, title: "3. Extract Data", desc: "Our AI extracts structured data instantly. Review online or export.", accent: true },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm", step.accent ? "bg-[#d71249]/10 text-[#d71249]" : "bg-[#005993]/10 text-[#005993]")}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
}

function EditorPage({ files, selectedFile, onSelectFile, onBack }: { 
  files: BatchFile[], 
  selectedFile: BatchFile, 
  onSelectFile: (id: string) => void,
  onBack: () => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen overflow-hidden"
    >
      <header className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-[#005993] to-[#d71249] shadow-sm z-10">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onBack}>
          <ScanText className="w-6 h-6 text-white" />
          <h2 className="text-lg font-bold text-white tracking-tight">OCR Pro</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 h-9 px-4 bg-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/30 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 h-9 px-4 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
          <button className="flex items-center gap-2 h-9 px-4 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
            <Languages className="w-4 h-4" />
            <span>Translate</span>
          </button>
          <div className="w-px h-6 bg-white/30 mx-2" />
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col hidden md:flex">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Batch Files</h3>
            <div className="text-xs text-slate-500">{files.length} items</div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {files.map(file => (
              <button 
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all",
                  selectedFile.id === file.id 
                    ? "bg-[#005993]/10 text-[#005993] dark:bg-[#005993]/20 dark:text-[#3388c2]" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {file.type === 'pdf' ? <FileText className="w-5 h-5 opacity-60" /> : <ImageIcon className="w-5 h-5 opacity-60" />}
                <span className="text-sm font-medium truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Viewer */}
        <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-950 relative">
          <div className="flex justify-between items-center px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button className="p-1.5 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"><ZoomIn className="w-5 h-5" /></button>
              <button className="p-1.5 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"><ZoomOut className="w-5 h-5" /></button>
              <div className="w-px bg-slate-300 dark:bg-slate-700 mx-1 my-1" />
              <button className="p-1.5 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"><RotateCcw className="w-5 h-5" /></button>
              <button className="p-1.5 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"><RotateCw className="w-5 h-5" /></button>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Page 1 of 1</span>
          </div>

          <div className="flex-1 overflow-auto p-12 flex justify-center">
            <div className="bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl aspect-[1/1.4] rounded-sm relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586281380349-632531773672?auto=format&fit=crop&q=80&w=1000" 
                alt="Document" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-20 pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Highlight Overlay Boxes */}
              <div className="absolute top-[15%] right-[15%] w-32 h-6 border-2 border-[#005993] bg-[#005993]/10 rounded-sm cursor-pointer hover:bg-[#005993]/20 transition-colors" />
              <div className="absolute top-[20%] right-[15%] w-28 h-6 border-2 border-[#005993] bg-[#005993]/10 rounded-sm cursor-pointer hover:bg-[#005993]/20 transition-colors" />
              <div className="absolute top-[25%] left-[10%] w-48 h-8 border-2 border-[#005993] bg-[#005993]/10 rounded-sm cursor-pointer hover:bg-[#005993]/20 transition-colors" />
              
              <div className="absolute bottom-[20%] right-[15%] w-32 h-10 border-2 border-[#005993] bg-[#005993]/20 rounded-sm flex items-center justify-center group cursor-pointer">
                <div className="absolute -top-10 bg-slate-800 text-white text-xs px-3 py-1.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Total Amount
                </div>
                <div className="w-full h-full bg-[#005993]/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <aside className="w-96 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#005993] dark:text-[#3388c2]">Extracted Data</h3>
            {selectedFile.extractedData?.confidence === 'high' ? (
              <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>High Confidence</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#d71249] text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Needs Review</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <DataField label="Invoice Number" value={selectedFile.extractedData?.invoiceNumber || '---'} />
            <DataField label="Date" value={selectedFile.extractedData?.date || '---'} />
            <DataField label="Vendor" value={selectedFile.extractedData?.vendor || '---'} />
            
            <div className="bg-[#005993]/5 dark:bg-[#005993]/10 -mx-4 px-4 py-4 rounded-xl border border-[#005993]/20 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-[#005993] dark:text-[#3388c2] uppercase tracking-widest">Total Amount</label>
                <Eye className="w-4 h-4 text-[#005993]/60" />
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={selectedFile.extractedData?.totalAmount || '---'} 
                  readOnly
                  className="w-full h-12 px-4 bg-white dark:bg-slate-950 border-2 border-[#005993] rounded-xl text-lg font-bold text-[#005993] dark:text-[#3388c2] outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005993] hover:scale-110 transition-transform">
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex gap-3">
            <button className="flex-1 h-11 bg-white dark:bg-slate-800 border border-[#d71249] text-[#d71249] font-bold rounded-xl hover:bg-[#d71249]/5 transition-colors">
              Discard
            </button>
            <button className="flex-1 h-11 bg-[#005993] text-white font-bold rounded-xl hover:bg-[#004b7a] transition-all shadow-md shadow-[#005993]/20">
              Approve Data
            </button>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

function DataField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1.5 group">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#005993] transition-colors">{label}</label>
      <div className="relative">
        <input 
          type="text" 
          value={value} 
          readOnly
          className="w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 outline-none group-hover:border-[#005993]/30 transition-colors"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#005993] opacity-0 group-hover:opacity-100 transition-all">
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

