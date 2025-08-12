import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import CertificateCard from '@/components/CertificateCard/CertificateCard';
import html2canvas from 'html2canvas';

const NFTCreator = () => {
  const [form, setForm] = useState({
    certificateType: '',
    certificateTitle: '',
    studentName: '',
    issuer: '',
    issueDate: new Date().toISOString().split('T')[0],
    logo: '',
  });
  const [logoPreview, setLogoPreview] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'logo' && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setForm({ ...form, logo: URL.createObjectURL(file) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const container = cardRef.current;
    if (!container) return;

    // Target the actual card node
    const card = (container.querySelector('.pc-card') as HTMLElement) || container;
    const shine = card.querySelector('.pc-shine') as HTMLElement | null;
    const glare = card.querySelector('.pc-glare') as HTMLElement | null;

    // Temporarily disable overlays/animations that can break rendering
    const prevShineDisplay = shine?.style.display;
    const prevGlareDisplay = glare?.style.display;
    shine && (shine.style.display = 'none');
    glare && (glare.style.display = 'none');
    card.classList.remove('active');

    try {
      const canvas = await html2canvas(card, {
        backgroundColor: '#0b0b0b',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      const title = (typeof form.certificateTitle === 'string' && form.certificateTitle) || 'certificate';
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      // Restore
      if (shine) shine.style.display = prevShineDisplay ?? '';
      if (glare) glare.style.display = prevGlareDisplay ?? '';
    }
  };

  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen flex flex-col md:flex-row items-center justify-center px-12 pt-8">
        {/* NFT Preview */}
        <section className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
             <div ref={cardRef}>
             <CertificateCard
                certificateType={form.certificateType || "Certificate of Completion"}
                name={form.studentName || 'Student Name'}
                title={form.certificateTitle || 'Certificate Title'}
                issuer={form.issuer || 'Issuer Name'}
                issueDate={form.issueDate || 'Issue Date'}
                logoUrl={form.logo || ''}
                enableTilt={true}
                innerGradient={""}
            />
             </div>
        </section>
        {/* Form */}
        <section className="w-full md:w-1/2 flex justify-center">
          <form className="bg-gray-900 border border-white/20 rounded-xl shadow-lg p-6 w-full max-w-md space-y-5">
            <div>
              <Label htmlFor="certificateTitle">Certificate Title</Label>
              <Input
                id="certificateTitle"
                name="certificateTitle"
                value={form.certificateTitle}
                onChange={handleChange}
                placeholder="Enter certificate title"
                autoComplete="off"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                autoComplete="off"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="issuer">Issuer</Label>
              <Input
                id="issuer"
                name="issuer"
                value={form.issuer}
                onChange={handleChange}
                placeholder="Enter issuer name"
                autoComplete="off"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="logo">Issuer Logo (Optional)</Label>
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1"
              />
              {logoPreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-400 mb-1">Logo Preview:</p>
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
              )}
            </div>
            <Button type="button" onClick={handleDownload} className="w-full mt-4">
              Download Certificate
            </Button>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default NFTCreator;
