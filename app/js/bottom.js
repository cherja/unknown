var
  buttonsClassList = document.getElementById('toptbuttons').classList,
  headerHeight = document.getElementsByTagName('header')[0].offsetHeight,
  fixedClass = 'fixed';

window.onscroll = function() {
  if (window.pageYOffset >= headerHeight) buttonsClassList.add(fixedClass);
  else if (buttonsClassList.contains(fixedClass)) buttonsClassList.remove(fixedClass);
};