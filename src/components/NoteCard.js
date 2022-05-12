export const NoteCard = () => {
  return (
    <div class="card-container container-lg">
      <div class="content-container">
        <h2 class="card-title tx-20">The world of Turtle</h2>
        <p class="card-description ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <div class="bottom-container">
          <button class="btn btn-text">Edit</button>
          <div class="icon-container">
            <i class="uil uil-map-pin card-icon"></i>
            <i class="uil uil-archive card-icon"></i>
            <i class="uil uil-trash-alt card-icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
