import Script from "next/script";

export default function Footer() {
  return (

    <footer className="bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}