/* style */
hello_anno = function() {
  return 'hello';
};

hello_anno_arrow = () => {
  return 'hello';
};

hello_anno_arrow_1line = () => 'hello';

/* with param */
hey_multi_params = (name, excl) => `hey ${name}${'!'.repeat(excl)}`;
hey_one_param = name => `hey ${name}`;
