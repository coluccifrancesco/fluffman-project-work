import "../styles/CatLoading.css";

export default function CatLoading() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div class="loading-cat">
        <div class="body"></div>
        <div class="head">
          <div class="face"></div>
        </div>
        <div class="foot">
          <div class="tummy-end"></div>
          <div class="bottom"></div>
          <div class="legs left"></div>
          <div class="legs right"></div>
        </div>
        <div class="hands left"></div>
        <div class="hands right"></div>
      </div>
    </div>
  );
}
