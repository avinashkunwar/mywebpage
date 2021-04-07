export const htmlToText = (node: string) => {
  let tag = document.createElement('div');
  tag.innerHTML = node
  //Remove image captions
  tag.getElementsByTagName('figcaption')[0]?.remove()
  node = tag.innerText
  return node
}