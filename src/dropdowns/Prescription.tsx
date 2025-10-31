import { useState, useRef } from 'react';
import styles from './Prescription.module.css';

interface PrescriptionFile {
  file: File;
  preview: string;
}

interface RecipientInfo {
  fullName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  city: string;
  additionalInfo: string;
}

const Prescription: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [prescriptions, setPrescriptions] = useState<PrescriptionFile[]>([]);
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>({
    fullName: '',
    phone: '',
    email: '',
    deliveryAddress: '',
    city: '',
    additionalInfo: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | ''>('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { number: 1, label: 'Start' },
    { number: 2, label: 'Uploads' },
    { number: 3, label: 'Recipient' },
    { number: 4, label: 'Payment' },
    { number: 5, label: 'Complete' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setPrescriptions([...prescriptions, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newPrescriptions = [...prescriptions];
    URL.revokeObjectURL(newPrescriptions[index].preview);
    newPrescriptions.splice(index, 1);
    setPrescriptions(newPrescriptions);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRecipientChange = (field: keyof RecipientInfo, value: string) => {
    setRecipientInfo({ ...recipientInfo, [field]: value });
  };

  const canProceedFromUploads = prescriptions.length > 0;
  const canProceedFromRecipient = recipientInfo.fullName && recipientInfo.phone && recipientInfo.deliveryAddress && recipientInfo.city;
  const canProceedFromPayment = paymentMethod && (paymentMethod !== 'mpesa' || mpesaPhone);

  return (
    <div className={styles.prescriptionContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.mainTitle}>Submit Prescription</h1>

        {/* Progress Steps */}
        <div className={styles.progressContainer}>
          {steps.map((step, index) => (
            <div key={step.number} className={styles.stepWrapper}>
              <div className={styles.stepItem}>
                <div className={`${styles.stepCircle} ${currentStep >= step.number ? styles.stepActive : ''}`}>
                  {step.number}
                </div>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`${styles.stepLine} ${currentStep > step.number ? styles.stepLineActive : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className={styles.stepContent}>
          {/* Step 1: Start */}
          {currentStep === 1 && (
            <div className={styles.stepSection}>
              <h2 className={styles.stepTitle}>Start</h2>
              <p className={styles.stepDescription}>
                Welcome to the Submit a Prescription section of the website. We will guide you through the simple process of submitting your prescription to us.
              </p>
              <button className={styles.primaryButton} onClick={handleNext}>
                Upload your first prescription photo
              </button>

              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>Did you know?</h3>
                <p className={styles.infoText}>
                  If you create an account with us, you will get <strong>10% off your next purchase</strong>
                </p>
                <button className={styles.secondaryButton}>Create account now</button>
              </div>
            </div>
          )}

          {/* Step 2: Uploads */}
          {currentStep === 2 && (
            <div className={styles.stepSection}>
              <h2 className={styles.stepTitle}>Uploads</h2>
              <p className={styles.stepDescription}>
                Please upload clear photos of your prescription(s). You can upload multiple prescriptions.
              </p>

              <div className={styles.uploadSection}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className={styles.fileInput}
                />
                <button 
                  className={styles.uploadButton}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Choose files to upload
                </button>
              </div>

              {prescriptions.length > 0 && (
                <div className={styles.previewGrid}>
                  {prescriptions.map((prescription, index) => (
                    <div key={index} className={styles.previewCard}>
                      <img src={prescription.preview} alt={`Prescription ${index + 1}`} className={styles.previewImage} />
                      <button 
                        className={styles.removeButton}
                        onClick={() => removeFile(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.buttonGroup}>
                <button className={styles.backButton} onClick={handleBack}>Back</button>
                <button 
                  className={styles.primaryButton} 
                  onClick={handleNext}
                  disabled={!canProceedFromUploads}
                >
                  Continue to Recipient Info
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Recipient */}
          {currentStep === 3 && (
            <div className={styles.stepSection}>
              <h2 className={styles.stepTitle}>Recipient</h2>
              <p className={styles.stepDescription}>
                Please provide the recipient's information for delivery.
              </p>

              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={recipientInfo.fullName}
                    onChange={(e) => handleRecipientChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={recipientInfo.phone}
                    onChange={(e) => handleRecipientChange('phone', e.target.value)}
                    placeholder="e.g., 0712345678"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={recipientInfo.email}
                    onChange={(e) => handleRecipientChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Delivery Address *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={recipientInfo.deliveryAddress}
                    onChange={(e) => handleRecipientChange('deliveryAddress', e.target.value)}
                    placeholder="Enter delivery address"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>City/Town *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={recipientInfo.city}
                    onChange={(e) => handleRecipientChange('city', e.target.value)}
                    placeholder="Enter city or town"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Additional Information</label>
                  <textarea
                    className={styles.textarea}
                    value={recipientInfo.additionalInfo}
                    onChange={(e) => handleRecipientChange('additionalInfo', e.target.value)}
                    placeholder="Any special instructions or notes"
                    rows={4}
                  />
                </div>
              </form>

              <div className={styles.buttonGroup}>
                <button className={styles.backButton} onClick={handleBack}>Back</button>
                <button 
                  className={styles.primaryButton} 
                  onClick={handleNext}
                  disabled={!canProceedFromRecipient}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className={styles.stepSection}>
              <h2 className={styles.stepTitle}>Payment</h2>
              <p className={styles.stepDescription}>
                Select your preferred payment method.
              </p>

              <div className={styles.paymentMethods}>
                <div 
                  className={`${styles.paymentCard} ${paymentMethod === 'mpesa' ? styles.paymentCardActive : ''}`}
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  <div className={styles.paymentRadio}>
                    <div className={`${styles.radioOuter} ${paymentMethod === 'mpesa' ? styles.radioActive : ''}`}>
                      {paymentMethod === 'mpesa' && <div className={styles.radioInner} />}
                    </div>
                  </div>
                  <div className={styles.paymentInfo}>
                    <h3 className={styles.paymentTitle}>M-PESA</h3>
                    <p className={styles.paymentDescription}>Pay via M-PESA mobile money</p>
                  </div>
                </div>

                {paymentMethod === 'mpesa' && (
                  <div className={styles.mpesaInput}>
                    <label className={styles.label}>M-PESA Phone Number *</label>
                    <input
                      type="tel"
                      className={styles.input}
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="e.g., 0712345678"
                      required
                    />
                  </div>
                )}

                <div 
                  className={`${styles.paymentCard} ${paymentMethod === 'card' ? styles.paymentCardActive : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className={styles.paymentRadio}>
                    <div className={`${styles.radioOuter} ${paymentMethod === 'card' ? styles.radioActive : ''}`}>
                      {paymentMethod === 'card' && <div className={styles.radioInner} />}
                    </div>
                  </div>
                  <div className={styles.paymentInfo}>
                    <h3 className={styles.paymentTitle}>Credit/Debit Card</h3>
                    <p className={styles.paymentDescription}>Pay securely with your card</p>
                  </div>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button className={styles.backButton} onClick={handleBack}>Back</button>
                <button 
                  className={styles.primaryButton} 
                  onClick={handleNext}
                  disabled={!canProceedFromPayment}
                >
                  Complete Submission
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className={styles.stepSection}>
              <div className={styles.successIcon}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#7cb342" strokeWidth="2" fill="none"/>
                  <path d="M8 12L11 15L16 9" stroke="#7cb342" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className={styles.successTitle}>Prescription Submitted Successfully!</h2>
              <p className={styles.successDescription}>
                Thank you for submitting your prescription. Our pharmacist will review it and contact you shortly with a quotation and delivery details.
              </p>
              <p className={styles.successInfo}>
                You will receive a confirmation message on <strong>{recipientInfo.phone}</strong>
                {recipientInfo.email && <> and at <strong>{recipientInfo.email}</strong></>}
              </p>

              <div className={styles.summaryBox}>
                <h3 className={styles.summaryTitle}>Submission Summary</h3>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Prescriptions Uploaded:</span>
                  <span className={styles.summaryValue}>{prescriptions.length}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Recipient:</span>
                  <span className={styles.summaryValue}>{recipientInfo.fullName}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Delivery Address:</span>
                  <span className={styles.summaryValue}>{recipientInfo.deliveryAddress}, {recipientInfo.city}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Payment Method:</span>
                  <span className={styles.summaryValue}>{paymentMethod === 'mpesa' ? 'M-PESA' : 'Credit/Debit Card'}</span>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button className={styles.primaryButton} onClick={() => window.location.href = '/'}>
                  Return to Home
                </button>
                <button className={styles.secondaryButton} onClick={() => {
                  setCurrentStep(1);
                  setPrescriptions([]);
                  setRecipientInfo({
                    fullName: '',
                    phone: '',
                    email: '',
                    deliveryAddress: '',
                    city: '',
                    additionalInfo: ''
                  });
                  setPaymentMethod('');
                  setMpesaPhone('');
                }}>
                  Submit Another Prescription
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescription;