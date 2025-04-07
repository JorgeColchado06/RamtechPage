import "../globals.css";

export default function adminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <html>
      <body>
          <div className="">
            {children}
          </div>
      </body>
    </html>

  );
}