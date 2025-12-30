
import React from 'react';
import { EcardData } from '../types';

interface EditorPanelProps {
  data: EcardData;
  setData: (data: EcardData) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ data, setData }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
      <h3 className="text-lg font-bold text-stone-900 mb-6">Customize Details</h3>
      <p className="text-sm text-stone-500 italic">Advanced Studio editor active.</p>
    </div>
  );
};
