export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="profile-section-header">
        <p>👥 Profils LinkUp</p>
      </div>

      {children}
    </div>
  );
}