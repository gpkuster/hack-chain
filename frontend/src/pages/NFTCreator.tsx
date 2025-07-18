import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ProfileCard from '@/components/ProfileCard/ProfileCard';

const NFTCreator = () => {
  const [form, setForm] = useState({
    studentName: '',
    certificateTitle: '',
    educator: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <Navbar />
      <main className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] px-12 pt-16 my-8">
        {/* NFT Preview */}
        <section className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <ProfileCard
                name={form.certificateTitle || 'Certificate Title'}
                title={form.studentName || 'Student Name'}
                handle="javicodes"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/path/to/avatar.jpg"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={() => console.log('Contact clicked')}
            />
          {/* <div className="bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <span className="text-lg font-semibold gradient-text">NFT Certificate Preview</span>
            </div>
            <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg p-6 min-h-[260px] flex flex-col justify-center items-center">
              <div className="text-2xl font-bold mb-2 text-foreground">
                {form.certificateTitle || 'Certificate Title'}
              </div>
              <div className="text-lg mb-2 text-foreground/80">
                Awarded to <span className="font-semibold">{form.studentName || 'Student Name'}</span>
              </div>
              <div className="mb-2 text-foreground/70">
                By <span className="font-medium">{form.educator || 'Educator'}</span>
              </div>
              <div className="text-sm text-foreground/60">
                Date: {form.date || 'YYYY-MM-DD'}
              </div>
            </div>
          </div> */}
        </section>
        {/* Form */}
        <section className="w-full md:w-1/2 flex justify-center">
          <form className="bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 w-full max-w-md space-y-5">
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
              <Label htmlFor="educator">Educator</Label>
              <Input
                id="educator"
                name="educator"
                value={form.educator}
                onChange={handleChange}
                placeholder="Enter educator name"
                autoComplete="off"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Mint NFT
            </Button>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default NFTCreator;
