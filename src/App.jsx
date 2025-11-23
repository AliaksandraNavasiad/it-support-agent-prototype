import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Database, 
  Workflow, 
  CheckCircle, 
  Server
} from 'lucide-react';

// --- MOCK DATA ---
const CATEGORIES = [
  { id: 'cat_01', name: 'Hardware', prefix: 'HW' },
  { id: 'cat_02', name: 'Software', prefix: 'SW' },
  { id: 'cat_03', name: 'Network', prefix: 'NET' },
  { id: 'cat_04', name: 'Access/Auth', prefix: 'AUTH' }
];

const MOCK_TICKETS = [
  { id: 'INC-1001', title: 'Laptop won\'t turn on', category: 'Hardware', status: 'New', created: '2023-11-20 10:00' },
  { id: 'INC-1002', title: 'Need SQL Access', category: 'Access/Auth', status: 'In Progress', created: '2023-11-21 14:30' }
];

// --- SUB-COMPONENTS (Moved OUTSIDE main function to fix focus bug) ---

const Navigation = ({ activeTab, setActiveTab }) => (
  <div className="flex flex-col w-64 bg-slate-900 text-white h-screen p-4 border-r border-slate-800">
    <div className="mb-8 p-2">
      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        TechFlow MVP
      </h1>
      <p className="text-xs text-slate-500 font-mono">v0.1.0-alpha</p>
    </div>
    
    <nav className="space-y-1">
      <button 
        onClick={() => setActiveTab('app')}
        className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${activeTab === 'app' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
      >
        <LayoutDashboard size={18} />
        <span className="text-sm font-medium">User App</span>
      </button>

      <button 
        onClick={() => setActiveTab('database')}
        className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
      >
        <Database size={18} />
        <span className="text-sm font-medium">Schema View</span>
      </button>

      <button 
        onClick={() => setActiveTab('logic')}
        className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${activeTab === 'logic' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
      >
        <Workflow size={18} />
        <span className="text-sm font-medium">Logic Flow</span>
      </button>
    </nav>
  </div>
);

const AppView = ({ showSuccess, isSubmitting, handleSubmit, formData, setFormData, tickets }) => (
  <div className="p-8 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
      <PlusCircle className="mr-2 text-blue-600" /> New Ticket
    </h2>

    {showSuccess && (
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center text-emerald-700 animate-fade-in-down">
        <CheckCircle className="mr-2 h-5 w-5" />
        <span className="font-medium">Success: Flow triggered successfully. Ticket ID generated.</span>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Title</label>
            <input 
              required 
              type="text" 
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Brief summary of the issue"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select 
              required
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category...</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea 
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-32 transition resize-none"
              placeholder="Please provide details..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-2.5 px-4 rounded-lg text-white font-medium shadow-sm transition-all ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'}`}
          >
            {isSubmitting ? 'Processing...' : 'Submit Request'}
          </button>
        </form>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-fit">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-700">Live Data Preview</h3>
          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full">Read-Only</span>
        </div>
        
        <div className="space-y-3">
          {tickets.map((ticket, idx) => (
            <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 hover:border-blue-300 transition cursor-default">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-slate-800">{ticket.title}</div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${ticket.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {ticket.status}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                <span>{ticket.id}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{ticket.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DatabaseView = () => (
  <div className="p-8 max-w-5xl mx-auto">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center">
        <Server className="mr-2 text-emerald-600" /> Data Schema
      </h2>
      <p className="text-slate-600 text-sm">Target Dataverse structure and relationships.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Table Definition */}
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl border border-slate-700">
        <div className="bg-[#2d2d2d] p-3 border-b border-[#3e3e3e] flex justify-between items-center">
          <span className="text-emerald-400 font-mono font-bold text-sm">mvp_TicketCategory</span>
          <span className="text-[10px] text-slate-400 bg-[#3e3e3e] px-2 py-0.5 rounded">Reference</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed">
          <div className="text-[#c586c0] mb-2">CREATE TABLE <span className="text-[#9cdcfe]">mvp_TicketCategory</span> (</div>
          <div className="pl-4 text-[#d4d4d4]">
            <div>mvp_categoryId <span className="text-[#569cd6]">GUID PRIMARY KEY</span>,</div>
            <div>mvp_name <span className="text-[#569cd6]">NVARCHAR(100)</span>,</div>
            <div>mvp_prefix <span className="text-[#569cd6]">NVARCHAR(10)</span></div>
          </div>
          <div className="text-[#c586c0] mt-2">);</div>
          
          <div className="mt-4 pt-4 border-t border-[#3e3e3e]">
            <div className="text-[#6a9955] mb-2 text-xs">// Current Records:</div>
            {CATEGORIES.map((c, i) => (
              <div key={i} className="text-[#808080] text-xs py-0.5">
                {c.id} | {c.name} | {c.prefix}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl border border-slate-700">
        <div className="bg-[#2d2d2d] p-3 border-b border-[#3e3e3e] flex justify-between items-center">
          <span className="text-blue-400 font-mono font-bold text-sm">mvp_ITTicket</span>
          <span className="text-[10px] text-slate-400 bg-[#3e3e3e] px-2 py-0.5 rounded">Transactional</span>
        </div>
        <div className="p-4 font-mono text-sm leading-relaxed">
          <div className="text-[#c586c0] mb-2">CREATE TABLE <span className="text-[#9cdcfe]">mvp_ITTicket</span> (</div>
          <div className="pl-4 text-[#d4d4d4]">
            <div>mvp_ticketId <span className="text-[#569cd6]">GUID PRIMARY KEY</span>,</div>
            <div>mvp_title <span className="text-[#569cd6]">NVARCHAR(200)</span>,</div>
            <div className="flex items-center gap-2">
              <span>mvp_ticketNumber</span> 
              <span className="text-[#569cd6]">AUTONUMBER</span>
              <span className="text-[#6a9955] text-xs">// e.g. INC-1001</span>
            </div>
            <div>mvp_category <span className="text-[#569cd6]">LOOKUP (mvp_TicketCategory)</span>,</div>
            <div>mvp_status <span className="text-[#569cd6]">CHOICE (Status Reason)</span></div>
          </div>
          <div className="text-[#c586c0] mt-2">);</div>
        </div>
      </div>
    </div>
  </div>
);

const LogicView = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-2 text-slate-800 flex items-center">
      <Workflow className="mr-2 text-purple-600" /> Cloud Flow Logic
    </h2>
    <p className="mb-8 text-slate-600 text-sm">Visual representation of the backend Power Automate flow.</p>

    <div className="relative border-l-2 border-slate-300 ml-4 space-y-8">
      
      {/* Step 1 */}
      <div className="relative pl-8">
        <div className="absolute -left-[9px] top-0 bg-purple-600 w-4 h-4 rounded-full ring-4 ring-white"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-purple-300 transition">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-slate-800 text-sm">PowerApps (V2) Trigger</h4>
            <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">INPUTS</span>
          </div>
          <div className="bg-slate-50 p-2 rounded text-xs font-mono text-slate-600 border border-slate-100">
            UserEmail, Title, CategoryName, Description
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative pl-8">
        <div className="absolute -left-[9px] top-0 bg-blue-500 w-4 h-4 rounded-full ring-4 ring-white"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-blue-300 transition">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-slate-800 text-sm">Dataverse: List Rows</h4>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">QUERY</span>
          </div>
          <div className="text-xs text-slate-600">
            Filter: <code className="bg-slate-100 px-1 border border-slate-200 rounded">Name eq 'CategoryName'</code>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="relative pl-8">
        <div className="absolute -left-[9px] top-0 bg-blue-500 w-4 h-4 rounded-full ring-4 ring-white"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-blue-300 transition">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-slate-800 text-sm">Dataverse: Add a New Row</h4>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">CREATE</span>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-600 font-mono">
              Category = outputs('List_Rows')?[0]?.id
            </div>
            <div className="text-xs text-slate-600 font-mono">
              Title = triggerBody()?.Title
            </div>
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <div className="relative pl-8">
        <div className="absolute -left-[9px] top-0 bg-green-500 w-4 h-4 rounded-full ring-4 ring-white"></div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-green-300 transition">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-slate-800 text-sm">Respond to PowerApp</h4>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">OUTPUT</span>
          </div>
          <div className="text-xs text-slate-600">
            Return Variable: <code className="bg-slate-100 px-1 border border-slate-200 rounded">TicketID</code>
          </div>
        </div>
      </div>

    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('app'); 
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', category: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newId = `INC-${1000 + tickets.length + 1}`;
      
      const newTicket = {
        id: newId,
        title: formData.title,
        category: formData.category,
        status: 'New',
        created: new Date().toLocaleString()
      };

      setTickets(prev => [...prev, newTicket]);
      
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ title: '', category: '', description: '' });
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {activeTab === 'app' && 
          <AppView 
            showSuccess={showSuccess}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            tickets={tickets}
          />
        }
        {activeTab === 'database' && <DatabaseView />}
        {activeTab === 'logic' && <LogicView />}
      </div>
    </div>
  );
}
