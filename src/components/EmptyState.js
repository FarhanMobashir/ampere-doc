export const EmptyState = ({
  imageUrl,
  title,
  description,
  onButtonClick,
  buttonText,
}) => {
  return (
    <div className="empty-state">
      <img className="empty-state-image" src={imageUrl} alt={title} />
      <div className="empty-state-content">
        <h2 className="h2 black-6">{title}</h2>
        <p className="tx-18">{description}</p>
        <button className="btn btn-primary" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
