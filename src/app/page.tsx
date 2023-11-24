import KYCVerification from "@/components/kyc-verification";

export default async function Home() {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center">
      <KYCVerification />
    </main>
  );
}
