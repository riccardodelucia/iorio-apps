let UUID = 0;

export default function () {
  const getID = () => {
    UUID++;
    return UUID;
  };
  return getID();
}
