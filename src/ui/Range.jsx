import styled from "styled-components";

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SliderTrack = styled.div`
  position: relative;
  height: 7px;
  border-radius: 3px;
  background: var(--color-grey-200);
  margin: 20px 0px;
`;

const SliderRange = styled.div.attrs(({ $left, $width }) => ({
  style: {
    left: `${$left}%`,
    width: `${$width}%`,
  },
}))`
  position: absolute;
  height: 7px;
  border-radius: 3px;
  background: var(--color-blue-600);
`;

const Thumb = styled.input`
  appearance: none;
  background: transparent;
  position: absolute;
  pointer-events: none;
  &::-webkit-slider-thumb {
    pointer-events: all;
    appearance: none;
    height: 17px;
    width: 17px;
    background: var(--color-blue-600);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -6px;
  }
`;

const PriceRange = styled.p`
  width: 120px;
  font-size: small;
  align-self: center;
`;

function Range({ setValue, maxPrice, minValue, maxValue }) {
  const min = 0;
  const max = maxPrice;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setValue("minPrice", value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setValue("maxPrice", value);
  };

  //Set slider range for price
  const left = (minValue / max) * 100;
  const width = ((maxValue - minValue) / max) * 100;

  return (
    <SliderContainer>
      <SliderTrack>
        <SliderRange $left={left} $width={width} />
        <Thumb
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
        />
        <Thumb
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
        />
      </SliderTrack>
      <PriceRange>
        {minValue} EUR - {maxValue} EUR
      </PriceRange>
    </SliderContainer>
  );
}

export default Range;
