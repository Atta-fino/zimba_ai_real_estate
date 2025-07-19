import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

// Mock data for uploaded documents
const mockUploadedDocuments = [
  {
    id: 'doc1',
    fileName: 'Proof_of_Funds_Bank_Statement.pdf',
    fileType: 'pdf',
    uploadDate: '2024-07-25T10:30:00Z',
    status: 'verified', // 'pending_review', 'verified', 'rejected'
  },
  {
    id: 'doc2',
    fileName: 'Letter_of_Employment.docx',
    fileType: 'word',
    uploadDate: '2024-07-26T11:00:00Z',
    status: 'pending_review',
  },
   {
    id: 'doc3',
    fileName: 'Passport_Scan.jpg',
    fileType: 'image',
    uploadDate: '2024-07-22T09:00:00Z',
    status: 'rejected',
    rejectionReason: 'Image is blurry, please re-upload a clearer copy.'
  },
];

const DocumentStatusBadge = ({ status }) => {
  let colorClasses = 'bg-gray-200 text-gray-800';
  let iconName = 'FileClock';
  if (status === 'verified') {
    colorClasses = 'bg-green-100 text-green-700';
    iconName = 'FileCheck2';
  }
  if (status === 'pending_review') {
    colorClasses = 'bg-yellow-100 text-yellow-700';
    iconName = 'FileClock';
  }
  if (status === 'rejected') {
    colorClasses = 'bg-red-100 text-red-700';
    iconName = 'FileX2';
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full inline-flex items-center ${colorClasses}`}>
        <Icon name={iconName} size={14} className="mr-1.5"/>
        {status.replace('_', ' ').toUpperCase()}
    </span>
  );
};

const DocumentUpload = () => {
  const [documents, setDocuments] = useState(mockUploadedDocuments);
  const [newFile, setNewFile] = useState(null);
  const [documentType, setDocumentType] = useState('proof_of_funds');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!newFile) {
      alert("Please select a file to upload.");
      return;
    }
    setIsUploading(true);
    console.log(`Uploading ${newFile.name} of type ${documentType}...`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload

    // Add to mock data
    const newDoc = {
        id: `doc${Math.random()}`,
        fileName: newFile.name,
        fileType: newFile.type.split('/')[1] || 'file',
        uploadDate: new Date().toISOString(),
        status: 'pending_review',
    };
    setDocuments(prev => [newDoc, ...prev]);

    setIsUploading(false);
    setNewFile(null);
    alert("Document uploaded successfully and is pending review.");
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
      <h2 className="text-2xl font-semibold font-heading text-foreground mb-6">My Documents</h2>

      {/* Upload Section */}
      <div className="p-6 bg-card rounded-xl shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">Upload a New Document</h3>
        <p className="text-sm text-muted-foreground mb-4">
          For a smoother process, especially from abroad, you can upload documents like proof of funds or employment letters here. We'll keep them secure for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
                <label className="text-sm font-medium text-muted-foreground mb-1" htmlFor="docType">Document Type</label>
                <select id="docType" value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-primary focus:border-primary">
                    <option value="proof_of_funds">Proof of Funds</option>
                    <option value="employment_letter">Letter of Employment</option>
                    <option value="reference_letter">Reference Letter</option>
                    <option value="other">Other</option>
                </select>
            </div>
             <div>
                <label className="text-sm font-medium text-muted-foreground mb-1" htmlFor="fileUpload">Choose File</label>
                <Input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
             </div>
        </div>
        <div className="mt-4 flex justify-end">
            <Button onClick={handleUpload} disabled={!newFile || isUploading}>
                {isUploading ? <Icon name="LoaderCircle" className="animate-spin mr-2"/> : <Icon name="UploadCloud" className="mr-2"/>}
                Upload Document
            </Button>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-card rounded-xl shadow-lg">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Uploaded Documents</h3>
        </div>
        <ul className="divide-y divide-border">
          {documents.map(doc => (
            <li key={doc.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="flex items-center">
                <Icon name="FileText" size={24} className="mr-3 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground truncate max-w-xs" title={doc.fileName}>{doc.fileName}</p>
                  <p className="text-xs text-muted-foreground">Uploaded: {formatDate(doc.uploadDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <DocumentStatusBadge status={doc.status} />
                <Button variant="ghost" size="icon_sm" className="text-muted-foreground hover:text-destructive">
                    <Icon name="Trash2" size={16}/>
                </Button>
              </div>
               {doc.status === 'rejected' && doc.rejectionReason && (
                <p className="w-full sm:w-auto sm:col-span-2 text-xs text-red-500 mt-2 sm:mt-0 bg-red-50 p-2 rounded-md">
                    <strong>Reason:</strong> {doc.rejectionReason}
                </p>
              )}
            </li>
          ))}
          {documents.length === 0 && (
            <li className="p-8 text-center text-muted-foreground">You have not uploaded any documents yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpload;
