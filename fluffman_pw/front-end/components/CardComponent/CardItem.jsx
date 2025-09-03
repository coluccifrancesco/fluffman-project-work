export default function CardItem({ title }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm d-flex align-items-center justify-content-center">
        <div className="card-body text-center">
          <div className="mb-3 fw-bold">_placeholder_</div>
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </div>
  );
}
