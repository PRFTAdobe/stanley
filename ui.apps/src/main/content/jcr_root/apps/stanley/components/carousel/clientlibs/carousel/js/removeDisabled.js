(() => {
  if (
    window.parent &&
    window.parent.Granite &&
    window.parent.Granite?.author &&
    window.parent.Granite?.author?.editables &&
    window.Granite &&
    window.Granite?.author &&
    window.Granite?.author?.MessageChannel &&
    window.CQ &&
    window.CQ?.CoreComponents
  ) {
    if (window.CQ?.CoreComponents?.MESSAGE_CHANNEL === undefined) {
      window.CQ.CoreComponents.MESSAGE_CHANNEL = new
      window
        .Granite
        .author
        .MessageChannel('cqauthor', window);
    }
    window.CQ?.CoreComponents?.MESSAGE_CHANNEL?.subscribeRequestMessage(
      'cmp.panelcontainer',
      (message) => {
        if (message.data && message.data.type === 'cmp-carousel') {
          if (message.data.operation === 'navigate') {
            const {id, index} = message.data;
            const editable = window.parent?.Granite?.author.editables.find({
              path: id,
            });
            if (editable.length) {
              const item = editable[0].getChildren()[index];
              if (item) {
                setTimeout(() => {
                  item.overlay.setDisabled(false);
                }, 500);
              }
            }
          }
        }
      },
    );
  }
})();
