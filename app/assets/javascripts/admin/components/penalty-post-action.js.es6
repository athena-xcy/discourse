import discourseComputed from "discourse-common/utils/decorators";
import { equal } from "@ember/object/computed";
import { scheduleOnce } from "@ember/runloop";
import Component from "@ember/component";

const ACTIONS = ["delete", "delete_replies", "edit", "none"];

export default Component.extend({
  postId: null,
  postAction: null,
  postEdit: null,

  @discourseComputed
  penaltyActions() {
    return ACTIONS.map(id => {
      return { id, name: I18n.t(`admin.user.penalty_post_${id}`) };
    });
  },

  editing: equal("postAction", "edit"),

  actions: {
    penaltyChanged() {
      let postAction = this.postAction;

      // If we switch to edit mode, jump to the edit textarea
      if (postAction === "edit") {
        scheduleOnce("afterRender", () => {
          let elem = this.element;
          let body = elem.closest(".modal-body");
          body.scrollTop(body.height());
          elem.querySelector(".post-editor").focus();
        });
      }
    }
  }
});
