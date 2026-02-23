import { Link } from "react-router-dom";

export default function Booths() {
  const companies = ["Google", "Amazon", "Microsoft"];

  return (
    <div className="center-wrapper">
      <div className="card">
        <h2 className="card-title">Company Booths</h2>
        <div className="booth-links">
          {companies.map((c, i) => (
            <Link key={i} to={`/booth/${i}`} className="booth-link">
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}