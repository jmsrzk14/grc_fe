"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Username atau password salah.",
        });
      } else {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali!",
        });
        router.push("/compliance");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan sistem.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">
      {/* Left Side - Dark Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a1120] relative flex-col justify-between p-12 text-white">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-xl tracking-tight">DOTS</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">GRC Platform</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-md space-y-6">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Sistem Manajemen <br />
            GRC Terpadu
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Platform terintegrasi untuk pengelolaan tata kelola, manajemen risiko, 
            dan pematuhan regulasi secara efisien dan transparan.
          </p>
        </div>

        {/* Footer Section */}
        <div className="text-slate-500 text-sm">
          &copy; 2026 DOTS Platform
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[128px] -translate-y-1/2" />
      </div>

      {/* Right Side - Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px] space-y-10">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Masuk</h2>
            <p className="text-slate-500 text-base">
              Masuk menggunakan akun GRC Anda untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold text-slate-700">Username</Label>
                <Input
                  id="username"
                  placeholder="Masukkan username"
                  className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                  <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">Lupa Password?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#113a8c] hover:bg-[#0d2e70] text-white font-bold h-12 transition-all duration-300 shadow-md active:scale-[0.98] flex items-center justify-center gap-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Masuk ke Dashboard
                </>
              )}
            </Button>

            <div className="pt-4 text-center">
              <p className="text-slate-400 text-sm">
                DOTS GRC — Hanya untuk personel yang berwenang
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
