import { render } from "@testing-library/react";
import { Editor } from "./Editor";

test("editor component snapshot", () => {
  const { container } = render(<Editor onChange={jest.fn()} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div>
        <textarea
          style="display: none;"
        />
        <div
          class="editor-toolbar"
        >
          <a
            class="fa fa-bold"
            tabindex="-1"
            title="Bold (Ctrl-B)"
          />
          <a
            class="fa fa-italic"
            tabindex="-1"
            title="Italic (Ctrl-I)"
          />
          <a
            class="fa fa-header"
            tabindex="-1"
            title="Heading (Ctrl-H)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-quote-left"
            tabindex="-1"
            title="Quote (Ctrl-')"
          />
          <a
            class="fa fa-list-ul"
            tabindex="-1"
            title="Generic List (Ctrl-L)"
          />
          <a
            class="fa fa-list-ol"
            tabindex="-1"
            title="Numbered List (Ctrl-Alt-L)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-link"
            tabindex="-1"
            title="Create Link (Ctrl-K)"
          />
          <a
            class="fa fa-picture-o"
            tabindex="-1"
            title="Insert Image (Ctrl-Alt-I)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-eye no-disable"
            tabindex="-1"
            title="Toggle Preview (Ctrl-P)"
          />
          <a
            class="fa fa-columns no-disable no-mobile"
            tabindex="-1"
            title="Toggle Side by Side (F9)"
          />
          <a
            class="fa fa-arrows-alt no-disable no-mobile"
            tabindex="-1"
            title="Toggle Fullscreen (F11)"
          />
          <i
            class="separator"
          >
            |
          </i>
          <a
            class="fa fa-question-circle"
            href="https://simplemde.com/markdown-guide"
            tabindex="-1"
            target="_blank"
            title="Markdown Guide"
          />
        </div>
        <div
          class="CodeMirror cm-s-paper CodeMirror-wrap"
          translate="no"
        >
          <div
            style="overflow: hidden; position: relative; width: 3px; height: 0px;"
          >
            <textarea
              autocapitalize="off"
              autocorrect="off"
              spellcheck="false"
              style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; min-height: 1em; outline: none;"
              tabindex="0"
            />
          </div>
          <div
            class="CodeMirror-vscrollbar"
            cm-not-content="true"
            tabindex="-1"
          >
            <div
              style="min-width: 1px;"
            />
          </div>
          <div
            class="CodeMirror-hscrollbar"
            cm-not-content="true"
            tabindex="-1"
          >
            <div
              style="height: 100%; min-height: 1px;"
            />
          </div>
          <div
            class="CodeMirror-scrollbar-filler"
            cm-not-content="true"
          />
          <div
            class="CodeMirror-gutter-filler"
            cm-not-content="true"
          />
          <div
            class="CodeMirror-scroll"
            tabindex="-1"
          >
            <div
              class="CodeMirror-sizer"
              style="margin-left: 0px;"
            >
              <div
                style="position: relative;"
              >
                <div
                  class="CodeMirror-lines"
                  role="presentation"
                >
                  <div
                    role="presentation"
                    style="position: relative; outline: none;"
                  >
                    <div
                      class="CodeMirror-measure"
                    >
                      <pre
                        class="CodeMirror-line-like"
                      >
                        <span>
                          xxxxxxxxxx
                        </span>
                      </pre>
                    </div>
                    <div
                      class="CodeMirror-measure"
                    />
                    <div
                      style="position: relative; z-index: 1;"
                    />
                    <div
                      class="CodeMirror-cursors"
                    />
                    <div
                      class="CodeMirror-code"
                      role="presentation"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style="position: absolute; height: 50px; width: 1px;"
            />
            <div
              class="CodeMirror-gutters"
              style="display: none;"
            />
          </div>
        </div>
        <div
          class="editor-preview-side"
        />
        <div
          class="editor-statusbar"
        >
          <span
            class="autosave"
          />
          <span
            class="lines"
          >
            1
          </span>
          <span
            class="words"
          >
            0
          </span>
          <span
            class="cursor"
          >
            0:0
          </span>
        </div>
      </div>
    </div>
  `);
});
