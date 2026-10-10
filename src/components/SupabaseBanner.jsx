import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, AlertTriangle, Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { testOrdersTable, SUPABASE_URL } from '../supabaseClient';

export default function SupabaseBanner() {
  const [status, setStatus] = useState('checking'); // 'checking' | 'ready' | 'missing'
  const [copied, setCopied] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const checkStatus = async () => {
    setStatus('checking');
    const result = await testOrdersTable();
    if (result.ok) {
      setStatus('ready');
    } else {
      setStatus('missing');
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const sqlCode = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    dishes JSONB NOT NULL,
    items_summary TEXT NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    notes TEXT DEFAULT ''
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public select from orders" ON public.orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public update to orders" ON public.orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (status === 'ready') {
    return (
      <div className="bg-emerald-950/80 border-b border-emerald-800 text-emerald-200 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Supabase Connected:</strong> Table <code className="bg-emerald-900/80 px-1.5 py-0.5 rounded text-emerald-300">orders</code> is live and verified at <span className="underline">{SUPABASE_URL}</span>.
          </span>
        </div>
        <button
          onClick={checkStatus}
          className="hover:text-emerald-100 flex items-center gap-1 text-[11px] bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-700/50"
        >
          <RefreshCw className="w-3 h-3" /> Re-check
        </button>
      </div>
    );
  }

  return (
    <div className="bg-amber-950/90 border-b border-amber-800 text-amber-200 px-4 py-2.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Supabase Setup Notice:</strong> Table <code className="bg-amber-900 px-1 rounded text-amber-300 font-mono">orders</code> needs to be created in your Supabase SQL Editor for live sync.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copySql}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold px-2.5 py-1 rounded text-xs transition"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? 'Copied SQL!' : 'Copy SQL Script'}
          </button>
          <button
            onClick={() => setShowSql(!showSql)}
            className="text-amber-300 hover:underline px-2 py-1 text-xs"
          >
            {showSql ? 'Hide SQL' : 'View SQL'}
          </button>
          <a
            href="https://supabase.com/dashboard/project/tehmzakrejbuytuoocll/sql"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 px-2.5 py-1 rounded border border-amber-700 text-xs transition"
          >
            Open SQL Editor <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={checkStatus}
            className="hover:text-amber-100 flex items-center gap-1 bg-amber-900/60 px-2 py-1 rounded border border-amber-700 text-xs transition"
          >
            <RefreshCw className="w-3 h-3" /> Check Again
          </button>
        </div>
      </div>

      {showSql && (
        <div className="mt-3 p-3 bg-slate-900 rounded border border-amber-800/60 text-slate-300 font-mono text-[11px] overflow-x-auto relative">
          <pre>{sqlCode}</pre>
        </div>
      )}
    </div>
  );
}

