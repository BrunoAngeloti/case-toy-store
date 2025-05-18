import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ValidationItem } from '@/components/ValidationItem';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const passwordValidations = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    minLength: password.length >= 6,
    match: password === confirmPassword,
  };

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  const handleRegister = async () => {
    if (!isPasswordValid) {
      toast.error('A senha não atende aos requisitos.');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Conta criada com sucesso! Faça login.');
    router.push('/login');
  };

  useEffect(() => {
    document.title = 'Toy Store - Criar conta';
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Criar Conta</h1>
          <p className="text-gray-600 text-sm mt-1">Cadastre-se para começar a gerenciar</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium mb-1">A senha deve conter:</p>
            <ValidationItem ok={passwordValidations.hasUppercase} label="1 letra maiúscula" />
            <ValidationItem ok={passwordValidations.hasLowercase} label="1 letra minúscula" />
            <ValidationItem ok={passwordValidations.hasNumber} label="1 número" />
            <ValidationItem ok={passwordValidations.minLength} label="Mínimo de 6 caracteres" />
            <ValidationItem ok={passwordValidations.match} label="As senhas coincidem" />
          </div>

          <button
            onClick={handleRegister}
            disabled={!isPasswordValid || !email}
            className={`w-full ${
              isPasswordValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
            } text-white px-6 py-2 rounded-lg text-sm transition cursor-pointer`}
          >
            Criar conta
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Fazer login
          </a>
        </p>
      </div>
    </main>
  );
}


