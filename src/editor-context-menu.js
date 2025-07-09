
function getEditorContextMenuJs(selectors) {

    const selectorsStr = JSON.stringify(selectors)
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');

    return `<script>
		(function () {
		console.log("Hello from custom_context_menu.js~");

		const selectors = JSON.parse("${selectorsStr}");

		const css_selectors = selectors.map(s => {
			const match = s.match(/^([*^|])?(.+)$/);
			if (match) {
				const [_, prefix, text] = match;
				return \`[aria-label\${prefix || ''}="\${text}"]\`;
			}
			return \`[aria-label="\${s}"]\`;
		}).join(",\\n");

		console.log(css_selectors);

		function wait_for(root) {
			const selector = ".monaco-menu-container > .monaco-scrollable-element";
			new MutationObserver((mutations) => {
			for (let mutation of mutations) {
				for (let node of mutation.addedNodes) {
				if (node.matches?.(selector)) {
					modify(node);
				}
				}
			}
			}).observe(root, { subtree: true, childList: true });
		}

		Element.prototype._attachShadow = Element.prototype.attachShadow;
		Element.prototype.attachShadow = function () {
			const shadow = this._attachShadow({ mode: "open" });
			wait_for(shadow);
			return shadow;
		};
		wait_for(document);

		let mouse_y = 0;
		document.addEventListener("mousedown", (e) => {
			if (e.button === 2) {
			mouse_y = e.clientY;
			}
		});

		function modify(container) {
            if (container.matches('.titlebar-container *')) {
                return;
			}

            // Check if this is an editor context menu by looking for editor-specific actions
            const isEditorContextMenu = Array.from(container.querySelectorAll('.action-label'))
                .some(el => {
                    const label = el.getAttribute('aria-label') || '';
                    return label.includes('Format Document');
                });

            if (!isEditorContextMenu) {
			    return;
			}

			for (let item of container.querySelectorAll(".action-item")) {
                const label = item.querySelector(".action-label");
                const aria_label = label?.getAttribute("aria-label") || "_";
                item.setAttribute("aria-label", aria_label);
			}

			const menu = container.parentNode;
			const style = document.createElement("style");
			menu.appendChild(style);
			style.innerText = \`
			:host > .monaco-menu-container, :not(.menubar-menu-button) > .monaco-menu-container {
                \${css_selectors},
                .visible.scrollbar.vertical, .shadow {
                    display: none !important;
                }
			}
			\`.replaceAll(/\\s+/g, " ");

			if (menu.matches(".monaco-submenu")) {
			    return;
			}

            for (let separator of container.querySelectorAll(".separator")) {
                separator.setAttribute("style", "display: none !important;");
            }

			let menu_top = parseInt(menu.style.top);
			const menu_height = menu.clientHeight;
			const titlebar_height = 40;
			const window_height = window.innerHeight;
			if (menu_top < titlebar_height && menu_height < 90) {
			    mouse_y = menu_top;
			} else {
                menu_top = mouse_y;
                if (menu_top + menu_height > window_height) {
                    menu_top = window_height - menu_height;
                }
                menu.style.top = menu_top + "px";
			}
		}
		})();
		</script>`;
}

module.exports = { getEditorContextMenuJs };