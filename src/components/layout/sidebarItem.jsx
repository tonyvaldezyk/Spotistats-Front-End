const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    className={`sidebar-item ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    <span className="icon">{icon}</span>
    <span className="label">{label}</span>
  </div>
);

export default SidebarItem
