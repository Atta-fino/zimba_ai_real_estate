import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DocumentUpload from '../DocumentUpload';

// Mock UI components
jest.mock('../../../../components/ui/Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);
jest.mock('../../../../components/AppIcon', () => ({ name }) => <svg data-testid={`icon-${name}`} />);
jest.mock('../../../../components/ui/Input', () => (props) => <input data-testid="file-input" type="file" {...props} />);

describe('DocumentUpload Component', () => {
  const setup = () => {
    render(<DocumentUpload />);
  };

  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the document upload section and the list of existing documents', () => {
    setup();
    expect(screen.getByText('My Documents')).toBeInTheDocument();
    expect(screen.getByText('Upload a New Document')).toBeInTheDocument();

    // Check for mock documents
    expect(screen.getByText('Proof_of_Funds_Bank_Statement.pdf')).toBeInTheDocument();
    expect(screen.getByText('VERIFIED')).toBeInTheDocument();
    expect(screen.getByText('Letter_of_Employment.docx')).toBeInTheDocument();
    expect(screen.getByText('PENDING REVIEW')).toBeInTheDocument();
    expect(screen.getByText('Passport_Scan.jpg')).toBeInTheDocument();
    expect(screen.getByText('REJECTED')).toBeInTheDocument();
    expect(screen.getByText(/Reason: Image is blurry/i)).toBeInTheDocument();
  });

  it('should simulate a file upload and add it to the list', async () => {
    setup();
    const fileInput = screen.getByTestId('file-input');
    const uploadButton = screen.getByText('Upload Document');

    // Button should be disabled initially
    expect(uploadButton).toBeDisabled();

    const testFile = new File(['hello'], 'new_doc.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [testFile] } });

    // Button should be enabled after file selection
    expect(uploadButton).not.toBeDisabled();

    fireEvent.click(uploadButton);

    expect(screen.getByTestId('icon-LoaderCircle')).toBeInTheDocument(); // Loading state

    await waitFor(() => {
      // New document appears in the list
      expect(screen.getByText('new_doc.pdf')).toBeInTheDocument();
      // Status should be pending review
      const newDocRow = screen.getByText('new_doc.pdf').closest('li');
      expect(newDocRow.textContent).toContain('PENDING REVIEW');
    });

    expect(window.alert).toHaveBeenCalledWith("Document uploaded successfully and is pending review.");
  });
});
