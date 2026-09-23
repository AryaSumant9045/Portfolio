import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-8">
        <p className="text-[12.5px] text-faint">
          © {new Date().getFullYear()} {profile.name}. Designed and built from scratch.
        </p>
        <p className="text-[12.5px] text-faint">
          Next.js · Tailwind CSS · Framer Motion · TypeScript
        </p>
      </div>
    </footer>
  );
}
