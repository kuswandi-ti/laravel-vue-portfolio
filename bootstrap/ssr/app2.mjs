import _, { debounce } from "lodash";
import axios$1 from "axios";
import jquery from "jquery";
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";
import { ref, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, useSSRContext, resolveComponent, createTextVNode, onMounted, createCommentVNode, watch, reactive, withDirectives, vModelText, Fragment, renderList, vModelSelect } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderStyle, ssrLooseContain, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import Swal from "sweetalert2";
import { createApp } from "vue/dist/vue.esm-bundler.js";
import { useRoute, useRouter, createRouter, createWebHistory } from "vue-router";
import flatpickr from "flatpickr";
import { Bootstrap4Pagination } from "laravel-vue-pagination";
window._ = _;
window.axios = axios$1;
window.$ = window.jquery = jquery;
const app$1 = "";
const _sfc_main$b = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const errorMessage = ref("");
    const loading = ref(false);
    const createSchema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required().min(8)
    });
    const handleSubmit = async (values, actions) => {
      loading.value = true;
      errorMessage.value = "";
      await axios.post("/api/login", values).then((response) => {
        if (response.data.success) {
          Toast.fire({
            icon: "success",
            title: response.data.message
          });
          window.location.href = "/admin/about";
        } else {
          errorMessage.value = response.data.message;
        }
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      }).finally(() => {
        loading.value = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-box" }, _attrs))}><div class="register-logo"><span>Login Admin</span></div><div class="card card-outline card-primary"><div class="card-body"><div class="alert alert-warning"><h6>Email : <strong>kuswandi.ti@gmail.com</strong></h6><h6>Password : <strong>12345678</strong></h6></div>`);
      if (errorMessage.value) {
        _push(`<div class="alert alert-danger" role="alert">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Form), {
        onSubmit: handleSubmit,
        "validation-schema": unref(createSchema)
      }, {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="input-group mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "email",
              type: "email",
              class: ["form-control", { "is-invalid": errors.email }],
              placeholder: "Email"
            }, null, _parent2, _scopeId));
            _push2(`<div class="input-group-append"${_scopeId}><div class="input-group-text"${_scopeId}><span class="fas fa-envelope"${_scopeId}></span></div></div><span id="errorEmail" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.email)}</span></div><div class="input-group mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "password",
              type: "password",
              class: ["form-control", { "is-invalid": errors.password }],
              placeholder: "Password"
            }, null, _parent2, _scopeId));
            _push2(`<div class="input-group-append"${_scopeId}><div class="input-group-text"${_scopeId}><span class="fas fa-lock"${_scopeId}></span></div></div><span id="errorPassword" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.password)}</span></div><div class="row"${_scopeId}><div class="col-8"${_scopeId}><p class="mb-0"${_scopeId}><a href="/" class="text-center"${_scopeId}>Return to Website</a></p></div><div class="col-4"${_scopeId}><button type="submit" class="btn btn-primary btn-block"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="spinner-border spinner-border-sm" role="status"${_scopeId}><span class="sr-only"${_scopeId}>Loading...</span></div>`);
            } else {
              _push2(`<span${_scopeId}> Login</span>`);
            }
            _push2(`</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "input-group mb-3" }, [
                createVNode(unref(Field), {
                  name: "email",
                  type: "email",
                  class: ["form-control", { "is-invalid": errors.email }],
                  placeholder: "Email"
                }, null, 8, ["class"]),
                createVNode("div", { class: "input-group-append" }, [
                  createVNode("div", { class: "input-group-text" }, [
                    createVNode("span", { class: "fas fa-envelope" })
                  ])
                ]),
                createVNode("span", {
                  id: "errorEmail",
                  class: "invalid-feedback"
                }, toDisplayString(errors.email), 1)
              ]),
              createVNode("div", { class: "input-group mb-3" }, [
                createVNode(unref(Field), {
                  name: "password",
                  type: "password",
                  class: ["form-control", { "is-invalid": errors.password }],
                  placeholder: "Password"
                }, null, 8, ["class"]),
                createVNode("div", { class: "input-group-append" }, [
                  createVNode("div", { class: "input-group-text" }, [
                    createVNode("span", { class: "fas fa-lock" })
                  ])
                ]),
                createVNode("span", {
                  id: "errorPassword",
                  class: "invalid-feedback"
                }, toDisplayString(errors.password), 1)
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-8" }, [
                  createVNode("p", { class: "mb-0" }, [
                    createVNode("a", {
                      href: "/",
                      class: "text-center"
                    }, "Return to Website")
                  ])
                ]),
                createVNode("div", { class: "col-4" }, [
                  createVNode("button", {
                    type: "submit",
                    class: "btn btn-primary btn-block",
                    disabled: loading.value
                  }, [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "spinner-border spinner-border-sm",
                      role: "status"
                    }, [
                      createVNode("span", { class: "sr-only" }, "Loading...")
                    ])) : (openBlock(), createBlock("span", { key: 1 }, " Login"))
                  ], 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/Login.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const errorMessage = ref("");
    const loading = ref(false);
    const createSchema = yup.object({
      name: yup.string().required().max(255),
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
      c_password: yup.string().required("confirmation password is a required field").min(8).oneOf([yup.ref("password"), null], "Password and Confirmation Password are not the same")
    });
    const handleSubmit = async (values, actions) => {
      loading.value = true;
      errorMessage.value = "";
      await axios.post("/api/register", values).then((response) => {
        if (response.data.success) {
          window.location.href = "/admin/dashboard";
          Toast.fire({
            icon: "success",
            title: response.data.message
          });
        } else {
          errorMessage.value = response.data.message;
        }
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      }).finally(() => {
        loading.value = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "register-box" }, _attrs))}><div class="register-logo"><span>Multipurpose Module Laravel Vue</span></div><div class="card card-outline card-primary"><div class="card-header text-center"><span class="h1">Register</span></div><div class="card-body">`);
      if (errorMessage.value) {
        _push(`<div class="alert alert-danger" role="alert">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Form), {
        onSubmit: handleSubmit,
        "validation-schema": unref(createSchema)
      }, {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="input-group mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              type: "text",
              class: ["form-control", { "is-invalid": errors.name }],
              placeholder: "Name"
            }, null, _parent2, _scopeId));
            _push2(`<div class="input-group-append"${_scopeId}><div class="input-group-text"${_scopeId}><span class="fas fa-user"${_scopeId}></span></div></div><span id="errorName" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.name)}</span></div><div class="input-group mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "email",
              type: "email",
              class: ["form-control", { "is-invalid": errors.email }],
              placeholder: "Email"
            }, null, _parent2, _scopeId));
            _push2(`<div class="input-group-append"${_scopeId}><div class="input-group-text"${_scopeId}><span class="fas fa-envelope"${_scopeId}></span></div></div><span id="errorEmail" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.email)}</span></div><div class="input-group mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "password",
              type: "password",
              class: ["form-control", { "is-invalid": errors.password }],
              placeholder: "Password"
            }, null, _parent2, _scopeId));
            _push2(`<div class="input-group-append"${_scopeId}><div class="input-group-text"${_scopeId}><span class="fas fa-lock"${_scopeId}></span></div></div><span id="errorPassword" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.password)}</span></div><div class="input-group mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "c_password",
              type: "password",
              class: ["form-control", { "is-invalid": errors.c_password }],
              placeholder: "Retype password"
            }, null, _parent2, _scopeId));
            _push2(`<div class="input-group-append"${_scopeId}><div class="input-group-text"${_scopeId}><span class="fas fa-lock"${_scopeId}></span></div></div><span id="errorCPassword" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.c_password)}</span></div><div class="row"${_scopeId}><div class="col-8"${_scopeId}><a href="/login" class="text-center"${_scopeId}>I already have a user ?</a></div><div class="col-4"${_scopeId}><button type="submit" class="btn btn-primary btn-block"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""}${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="spinner-border spinner-border-sm" role="status"${_scopeId}><span class="sr-only"${_scopeId}>Loading...</span></div>`);
            } else {
              _push2(`<span${_scopeId}> Register</span>`);
            }
            _push2(`</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "input-group mb-3" }, [
                createVNode(unref(Field), {
                  name: "name",
                  type: "text",
                  class: ["form-control", { "is-invalid": errors.name }],
                  placeholder: "Name"
                }, null, 8, ["class"]),
                createVNode("div", { class: "input-group-append" }, [
                  createVNode("div", { class: "input-group-text" }, [
                    createVNode("span", { class: "fas fa-user" })
                  ])
                ]),
                createVNode("span", {
                  id: "errorName",
                  class: "invalid-feedback"
                }, toDisplayString(errors.name), 1)
              ]),
              createVNode("div", { class: "input-group mb-3" }, [
                createVNode(unref(Field), {
                  name: "email",
                  type: "email",
                  class: ["form-control", { "is-invalid": errors.email }],
                  placeholder: "Email"
                }, null, 8, ["class"]),
                createVNode("div", { class: "input-group-append" }, [
                  createVNode("div", { class: "input-group-text" }, [
                    createVNode("span", { class: "fas fa-envelope" })
                  ])
                ]),
                createVNode("span", {
                  id: "errorEmail",
                  class: "invalid-feedback"
                }, toDisplayString(errors.email), 1)
              ]),
              createVNode("div", { class: "input-group mb-3" }, [
                createVNode(unref(Field), {
                  name: "password",
                  type: "password",
                  class: ["form-control", { "is-invalid": errors.password }],
                  placeholder: "Password"
                }, null, 8, ["class"]),
                createVNode("div", { class: "input-group-append" }, [
                  createVNode("div", { class: "input-group-text" }, [
                    createVNode("span", { class: "fas fa-lock" })
                  ])
                ]),
                createVNode("span", {
                  id: "errorPassword",
                  class: "invalid-feedback"
                }, toDisplayString(errors.password), 1)
              ]),
              createVNode("div", { class: "input-group mb-3" }, [
                createVNode(unref(Field), {
                  name: "c_password",
                  type: "password",
                  class: ["form-control", { "is-invalid": errors.c_password }],
                  placeholder: "Retype password"
                }, null, 8, ["class"]),
                createVNode("div", { class: "input-group-append" }, [
                  createVNode("div", { class: "input-group-text" }, [
                    createVNode("span", { class: "fas fa-lock" })
                  ])
                ]),
                createVNode("span", {
                  id: "errorCPassword",
                  class: "invalid-feedback"
                }, toDisplayString(errors.c_password), 1)
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-8" }, [
                  createVNode("a", {
                    href: "/login",
                    class: "text-center"
                  }, "I already have a user ?")
                ]),
                createVNode("div", { class: "col-4" }, [
                  createVNode("button", {
                    type: "submit",
                    class: "btn btn-primary btn-block",
                    disabled: loading.value
                  }, [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "spinner-border spinner-border-sm",
                      role: "status"
                    }, [
                      createVNode("span", { class: "sr-only" }, "Loading...")
                    ])) : (openBlock(), createBlock("span", { key: 1 }, " Register"))
                  ], 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/auth/Register.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-header" }, _attrs))}><div class="container-fluid"><div class="row mb-2"><div class="col-sm-6"><h1 class="m-0">Dashboard</h1></div><div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/dashboard" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active">Dashboard</li></ol></div></div></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Dashboard.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const light = "";
const _sfc_main$8 = {
  __name: "UpdateAbout",
  __ssrInlineRender: true,
  setup(__props) {
    const formValues = ref();
    let path_photo = "";
    let path_cv = "";
    const editUserSchema = yup.object({
      name: yup.string().required(),
      job_title: yup.string().required("job title is a required field"),
      job_description: yup.string().required("job description is a required field"),
      place_of_birth: yup.string().required("place of birth is a required field"),
      date_of_birth: yup.string().required("date or birth is a required field"),
      address: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      about_description: yup.string().required("about description is a required field")
    });
    const handleSubmit = (values, actions) => {
      updateAbout(values, actions);
    };
    const getAbout = async () => {
      await axios.get("/api/about").then((response) => {
        if (response.data.data.length == 0) {
          formValues.value = {
            id: 0,
            name: "",
            job_title: "",
            job_description: "",
            place_of_birth: "",
            date_of_birth: "",
            address: "",
            email: "",
            phone: "",
            about_description: "",
            photo: "",
            cv: ""
          };
        } else {
          formValues.value = {
            id: response.data.data[0].id,
            name: response.data.data[0].name,
            job_title: response.data.data[0].job_title,
            job_description: response.data.data[0].job_description,
            place_of_birth: response.data.data[0].place_of_birth,
            date_of_birth: response.data.data[0].date_of_birth,
            address: response.data.data[0].address,
            email: response.data.data[0].email,
            phone: response.data.data[0].phone,
            about_description: response.data.data[0].about_description,
            photo: response.data.data[0].photo,
            cv: response.data.data[0].cv
          };
        }
        path_photo = formValues._value.photo;
        path_cv = formValues._value.cv;
      });
    };
    const updateAbout = async (values, actions) => {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("job_title", values.job_title);
      formData.append("job_description", values.job_description);
      formData.append("place_of_birth", values.place_of_birth);
      formData.append("date_of_birth", values.date_of_birth);
      formData.append("address", values.address);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("about_description", values.about_description);
      formData.append("photo", values.photo);
      formData.append("cv", values.cv);
      await axios.post("/api/about/" + formValues.value.id, formData).then((response) => {
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    const getPhoto = () => {
      let photo = "/img/avatar.jpg";
      if (formValues.photo) {
        if (formValues.photo.indexOf("base64") != -1) {
          photo = formValues.photo;
        } else {
          photo = path_photo;
        }
      } else {
        photo = path_photo;
      }
      return photo;
    };
    const onFileChangePhoto = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (file2) => {
        formValues.photo = reader.result;
        console.log(formValues.photo);
      };
      reader.readAsDataURL(file);
    };
    const onFileChangeCv = (e) => {
      formValues.value.cv = e.target.files[0];
    };
    onMounted(() => {
      flatpickr(".flatpickr", {
        dateFormat: "Y-m-d"
      });
      getAbout();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<!--[--><div class="content-header"><div class="container-fluid"><div class="row mb-2"><div class="col-sm-6"><h1 class="m-0"> About </h1></div><div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/dashboard" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item"> About </li></ol></div></div></div></div><div class="content"><div class="container-fluid"><div class="row"><div class="col-lg-12"><div class="card"><div class="card-body">`);
      _push(ssrRenderComponent(unref(Form), {
        ref: "form",
        onSubmit: handleSubmit,
        "validation-schema": unref(editUserSchema),
        "initial-values": formValues.value
      }, {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              id: "name",
              type: "text",
              class: ["form-control", { "is-invalid": errors.name }],
              placeholder: "Enter Full Name"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorName" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.name)}</span></div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="job_title"${_scopeId}>Job Title</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "job_title",
              id: "job_title",
              type: "text",
              class: ["form-control", { "is-invalid": errors.job_title }],
              placeholder: "Enter Job Title"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorJobTitle" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.job_title)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-12"${_scopeId}><div class="form-group"${_scopeId}><label for="job_description"${_scopeId}>Job Description</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "job_description",
              id: "job_description",
              as: "textarea",
              class: ["form-control", { "is-invalid": errors.job_description }],
              cols: "30",
              rows: "2",
              placeholder: "Enter Job Description"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorJobDescription" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.job_description)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="place_of_birth"${_scopeId}>Place of Birth</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "place_of_birth",
              id: "place_of_birth",
              type: "text",
              class: ["form-control", { "is-invalid": errors.place_of_birth }],
              placeholder: "Enter Place of Birth"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorPlaceOfBirth" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.place_of_birth)}</span></div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="date_of_birth"${_scopeId}>Date of Birth</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "date_of_birth",
              id: "date_of_birth",
              type: "text",
              class: ["form-control flatpickr", { "is-invalid": errors.date_of_birth }],
              placeholder: "Enter Date of Birth"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorDateOfBirth" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.date_of_birth)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-12"${_scopeId}><div class="form-group"${_scopeId}><label for="address"${_scopeId}>Address</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "address",
              id: "address",
              as: "textarea",
              class: ["form-control", { "is-invalid": errors.address }],
              cols: "30",
              rows: "2",
              placeholder: "Enter Address"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorAddress" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.address)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="email"${_scopeId}>Email</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "email",
              id: "email",
              type: "email",
              class: ["form-control", { "is-invalid": errors.email }],
              placeholder: "Enter Email"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorEmail" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.email)}</span></div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="phone"${_scopeId}>Phone (+62 format)</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "phone",
              id: "phone",
              type: "text",
              class: ["form-control", { "is-invalid": errors.phone }],
              placeholder: "Enter Phone"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorPhone" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.phone)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-12"${_scopeId}><div class="form-group"${_scopeId}><label for="about_description"${_scopeId}>About Description</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "about_description",
              id: "about_description",
              as: "textarea",
              class: ["form-control", { "is-invalid": errors.about_description }],
              cols: "30",
              rows: "2",
              placeholder: "Enter About Description"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorAboutDescription" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.about_description)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="name"${_scopeId}>Upload Photo </label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "photo",
              id: "photo",
              as: "file",
              class: "form-control"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input type="file" id="fileimg"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("input", {
                      type: "file",
                      id: "fileimg",
                      onChange: onFileChangePhoto
                    }, null, 32)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="text-center"${_scopeId}><img class="profile-user-img img-fluid img-circle mt-5"${ssrRenderAttr("src", getPhoto())} style="${ssrRenderStyle({ "width": "200px", "height": "200px" })}"${_scopeId}></div></div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="cv"${_scopeId}>Upload CV</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "cv",
              id: "cv",
              as: "file",
              class: "form-control"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input type="file"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("input", {
                      type: "file",
                      onChange: onFileChangeCv
                    }, null, 32)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            if (unref(path_cv)) {
              _push2(`<span${_scopeId}><a${ssrRenderAttr("href", unref(path_cv))} target="_blank"${_scopeId}>View File</a></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><button type="submit" class="btn btn-primary"${_scopeId}>Save</button>`);
          } else {
            return [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "name" }, "Name"),
                    createVNode(unref(Field), {
                      name: "name",
                      id: "name",
                      type: "text",
                      class: ["form-control", { "is-invalid": errors.name }],
                      placeholder: "Enter Full Name"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorName",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.name), 1)
                  ])
                ]),
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "job_title" }, "Job Title"),
                    createVNode(unref(Field), {
                      name: "job_title",
                      id: "job_title",
                      type: "text",
                      class: ["form-control", { "is-invalid": errors.job_title }],
                      placeholder: "Enter Job Title"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorJobTitle",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.job_title), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-12" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "job_description" }, "Job Description"),
                    createVNode(unref(Field), {
                      name: "job_description",
                      id: "job_description",
                      as: "textarea",
                      class: ["form-control", { "is-invalid": errors.job_description }],
                      cols: "30",
                      rows: "2",
                      placeholder: "Enter Job Description"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorJobDescription",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.job_description), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "place_of_birth" }, "Place of Birth"),
                    createVNode(unref(Field), {
                      name: "place_of_birth",
                      id: "place_of_birth",
                      type: "text",
                      class: ["form-control", { "is-invalid": errors.place_of_birth }],
                      placeholder: "Enter Place of Birth"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorPlaceOfBirth",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.place_of_birth), 1)
                  ])
                ]),
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "date_of_birth" }, "Date of Birth"),
                    createVNode(unref(Field), {
                      name: "date_of_birth",
                      id: "date_of_birth",
                      type: "text",
                      class: ["form-control flatpickr", { "is-invalid": errors.date_of_birth }],
                      placeholder: "Enter Date of Birth"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorDateOfBirth",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.date_of_birth), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-12" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "address" }, "Address"),
                    createVNode(unref(Field), {
                      name: "address",
                      id: "address",
                      as: "textarea",
                      class: ["form-control", { "is-invalid": errors.address }],
                      cols: "30",
                      rows: "2",
                      placeholder: "Enter Address"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorAddress",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.address), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "email" }, "Email"),
                    createVNode(unref(Field), {
                      name: "email",
                      id: "email",
                      type: "email",
                      class: ["form-control", { "is-invalid": errors.email }],
                      placeholder: "Enter Email"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorEmail",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.email), 1)
                  ])
                ]),
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "phone" }, "Phone (+62 format)"),
                    createVNode(unref(Field), {
                      name: "phone",
                      id: "phone",
                      type: "text",
                      class: ["form-control", { "is-invalid": errors.phone }],
                      placeholder: "Enter Phone"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorPhone",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.phone), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-12" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "about_description" }, "About Description"),
                    createVNode(unref(Field), {
                      name: "about_description",
                      id: "about_description",
                      as: "textarea",
                      class: ["form-control", { "is-invalid": errors.about_description }],
                      cols: "30",
                      rows: "2",
                      placeholder: "Enter About Description"
                    }, null, 8, ["class"]),
                    createVNode("span", {
                      id: "errorAboutDescription",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.about_description), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "name" }, "Upload Photo "),
                    createVNode(unref(Field), {
                      name: "photo",
                      id: "photo",
                      as: "file",
                      class: "form-control"
                    }, {
                      default: withCtx(() => [
                        createVNode("input", {
                          type: "file",
                          id: "fileimg",
                          onChange: onFileChangePhoto
                        }, null, 32)
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("img", {
                        class: "profile-user-img img-fluid img-circle mt-5",
                        src: getPhoto(),
                        style: { "width": "200px", "height": "200px" }
                      }, null, 8, ["src"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "cv" }, "Upload CV"),
                    createVNode(unref(Field), {
                      name: "cv",
                      id: "cv",
                      as: "file",
                      class: "form-control"
                    }, {
                      default: withCtx(() => [
                        createVNode("input", {
                          type: "file",
                          onChange: onFileChangeCv
                        }, null, 32)
                      ]),
                      _: 1
                    }),
                    unref(path_cv) ? (openBlock(), createBlock("span", { key: 0 }, [
                      createVNode("a", {
                        href: unref(path_cv),
                        target: "_blank"
                      }, "View File", 8, ["href"])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode("button", {
                type: "submit",
                class: "btn btn-primary"
              }, "Save")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/about/UpdateAbout.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "SkillListItem",
  __ssrInlineRender: true,
  props: {
    skill: Object,
    index: Number,
    selectAll: Boolean
  },
  emits: ["skillDeleted", "editSkill", "confirmSkillDeletion"],
  setup(__props, { emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<tr${ssrRenderAttrs(_attrs)}><th class="text-center"><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectAll) ? " checked" : ""}></th><td class="text-center">${ssrInterpolate(__props.index + 1)}</td><td>${ssrInterpolate(__props.skill.skill_name)}</td><td class="text-center">${ssrInterpolate(__props.skill.skill_experience)}</td><td class="text-center">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "#",
        onClick: ($event) => _ctx.$emit("editSkill", __props.skill)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-edit"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-edit" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`  `);
      _push(ssrRenderComponent(_component_router_link, {
        to: "#",
        onClick: ($event) => _ctx.$emit("confirmSkillDeletion", __props.skill.id)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-trash text-danger"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-trash text-danger" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</td></tr>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/skill/SkillListItem.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "SkillList",
  __ssrInlineRender: true,
  setup(__props) {
    const skills = ref({
      "data": []
    });
    const editing = ref(false);
    const formValues = ref();
    const form = ref(null);
    const searchQuery = ref(null);
    const selectedSkills = ref([]);
    const selectAll = ref(false);
    const skillIdBeingDeleted = ref(null);
    const createSkillSchema = yup.object({
      skill_name: yup.string().required("skill name is a required field"),
      skill_experience: yup.number("skill experience must numeric format").required("skill experience is a required field")
    });
    const editSkillSchema = yup.object({
      skill_name: yup.string().required("skill name is a required field"),
      skill_experience: yup.number("skill experience must numeric format").required("skill experience is a required field")
    });
    const handleSubmit = (values, actions) => {
      if (editing.value) {
        updateSkill(values, actions);
      } else {
        createSkill(values, actions);
      }
    };
    const getSkills = async (page = 1) => {
      await axios.get(`/api/skills?page=${page}`, {
        params: {
          query: searchQuery.value
        }
      }).then((response) => {
        skills.value = response.data.data;
        selectedSkills.value = [];
        selectAll.value = false;
      }).catch((error) => {
        selectedSkills.value = [];
        selectAll.value = false;
      });
    };
    const createSkill = async (values, { resetForm, setErrors }) => {
      await axios.post("/api/skills", values).then((response) => {
        skills.value.data.unshift(response.data.data);
        $("#skillFormModal").modal("hide");
        resetForm();
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        if (error.response.data.message) {
          setErrors(error.response.data.message);
        }
      });
    };
    const editSkill = (skill) => {
      editing.value = true;
      $("#skillFormModal").modal("show");
      formValues.value = {
        id: skill.id,
        skill_name: skill.skill_name,
        skill_experience: skill.skill_experience
      };
    };
    const updateSkill = async (values, actions) => {
      await axios.post("/api/skills/" + formValues.value.id, values).then((response) => {
        getSkills();
        $("#skillFormModal").modal("hide");
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    watch(searchQuery, debounce(() => {
      getSkills();
    }, 300));
    const toggleSelection = (skill) => {
      const index = selectedSkills.value.indexOf(skill.id);
      if (index === -1) {
        selectedSkills.value.push(skill.id);
      } else {
        selectedSkills.value.splice(index, 1);
      }
    };
    const confirmSkillDeletion = (id) => {
      skillIdBeingDeleted.value = id;
      $("#deleteSkillModal").modal("show");
    };
    onMounted(() => {
      getSkills();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<!--[--><div class="content-header"><div class="container-fluid"><div class="row mb-2"><div class="col-sm-6"><h1 class="m-0">List Skills</h1></div><div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/dashboard" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active">List Skills</li></ol></div></div></div></div><div class="content"><div class="container-fluid"><div class="card"><div class="card-body"><div class="d-flex justify-content-between"><div><button type="button" class="btn btn-primary mb-2"><i class="fa fa-plus-circle mr-1"></i> Add New Skill </button>`);
      if (selectedSkills.value.length > 0) {
        _push(`<button type="button" class="btn btn-danger mb-2 ml-2"><i class="fa fa-trash mr-1"></i> Delete Selected </button>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedSkills.value.length > 0) {
        _push(`<span class="ml-2"> Selected <span class="text-danger">${ssrInterpolate(selectedSkills.value.length)}</span> skills </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="form-control" placeholder="Search..."></div></div><table class="table table-bordered"><thead><tr class="text-center"><th><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectAll.value) ? ssrLooseContain(selectAll.value, null) : selectAll.value) ? " checked" : ""}></th><th style="${ssrRenderStyle({ "width": "10px" })}">#</th><th>Skill Name</th><th>Skill Experience (in year)</th><th>Options</th></tr></thead>`);
      if (skills.value.data.length > 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(skills.value.data, (skill, index) => {
          _push(ssrRenderComponent(_sfc_main$7, {
            key: skill.id,
            skill,
            index,
            onEditSkill: editSkill,
            onConfirmSkillDeletion: confirmSkillDeletion,
            onToggleSelection: toggleSelection,
            "select-all": selectAll.value
          }, null, _parent));
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(`<tbody><tr><td colspan="5" class="text-center"> No results found... </td></tr></tbody>`);
      }
      _push(`</table></div></div>`);
      _push(ssrRenderComponent(unref(Bootstrap4Pagination), {
        data: skills.value,
        onPaginationChangePage: getSkills
      }, null, _parent));
      _push(`</div></div><div class="modal" id="skillFormModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">`);
      if (editing.value) {
        _push(`<span>Edit Existing Skill</span>`);
      } else {
        _push(`<span>Add New Skill</span>`);
      }
      _push(`</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "form",
        ref: form,
        onSubmit: handleSubmit,
        "validation-schema": editing.value ? unref(editSkillSchema) : unref(createSkillSchema),
        "initial-values": formValues.value
      }, {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-body"${_scopeId}><div class="form-group"${_scopeId}><label for="skill_name"${_scopeId}>Skill Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "skill_name",
              type: "text",
              class: ["form-control", { "is-invalid": errors.skill_name }],
              id: "skill_name",
              placeholder: "Enter skill name"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorSkillName" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.skill_name)}</span></div><div class="form-group"${_scopeId}><label for="skill_experience"${_scopeId}>Skill Experience (in year)</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "skill_experience",
              type: "number",
              class: ["form-control", { "is-invalid": errors.skill_experience }],
              id: "skill_experience",
              placeholder: "Enter skill experience"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorSkillExperience" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.skill_experience)}</span></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-secondary" data-dismiss="modal"${_scopeId}>Close</button><button type="submit" class="btn btn-primary"${_scopeId}>Save</button></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-body" }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "skill_name" }, "Skill Name"),
                  createVNode(unref(Field), {
                    name: "skill_name",
                    type: "text",
                    class: ["form-control", { "is-invalid": errors.skill_name }],
                    id: "skill_name",
                    placeholder: "Enter skill name"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorSkillName",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.skill_name), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "skill_experience" }, "Skill Experience (in year)"),
                  createVNode(unref(Field), {
                    name: "skill_experience",
                    type: "number",
                    class: ["form-control", { "is-invalid": errors.skill_experience }],
                    id: "skill_experience",
                    placeholder: "Enter skill experience"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorSkillExperience",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.skill_experience), 1)
                ])
              ]),
              createVNode("div", { class: "modal-footer" }, [
                createVNode("button", {
                  type: "button",
                  class: "btn btn-secondary",
                  "data-dismiss": "modal"
                }, "Close"),
                createVNode("button", {
                  type: "submit",
                  class: "btn btn-primary"
                }, "Save")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="modal" id="deleteSkillModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title"><span>Delete Skill</span></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><h5>Are you sure you want to delete this skill ?</h5></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">No</button><button type="button" class="btn btn-danger">Yes</button></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/skill/SkillList.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "EducationListItem",
  __ssrInlineRender: true,
  props: {
    education: Object,
    index: Number,
    selectAll: Boolean
  },
  emits: ["educationDeleted", "editEducation", "confirmEducationDeletion"],
  setup(__props, { emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<tr${ssrRenderAttrs(_attrs)}><th class="text-center"><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectAll) ? " checked" : ""}></th><td class="text-center">${ssrInterpolate(__props.index + 1)}</td><td>${ssrInterpolate(__props.education.education_name)}</td><td>${ssrInterpolate(__props.education.education_city)}</td><td>${ssrInterpolate(__props.education.education_major)}</td><td class="text-center">${ssrInterpolate(__props.education.education_year_from)}</td><td class="text-center">${ssrInterpolate(__props.education.education_year_to)}</td><td class="text-center">${ssrInterpolate(__props.education.education_gpa)}</td><td class="text-center">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "#",
        onClick: ($event) => _ctx.$emit("editEducation", __props.education)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-edit"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-edit" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`  `);
      _push(ssrRenderComponent(_component_router_link, {
        to: "#",
        onClick: ($event) => _ctx.$emit("confirmEducationDeletion", __props.education.id)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-trash text-danger"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-trash text-danger" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</td></tr>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/education/EducationListItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "EducationList",
  __ssrInlineRender: true,
  setup(__props) {
    const educations = ref({
      "data": []
    });
    const editing = ref(false);
    const formValues = ref();
    const form = ref(null);
    const searchQuery = ref(null);
    const selectedEducations = ref([]);
    const selectAll = ref(false);
    const educationIdBeingDeleted = ref(null);
    const createEducationSchema = yup.object({
      education_name: yup.string().required("education name is a required field"),
      education_city: yup.string().required("education city is a required field"),
      education_year_from: yup.number("[education year from] must numeric format").required("[education year from] is a required field"),
      education_year_to: yup.number("[education year to] must numeric format").required("[education year to] is a required field"),
      education_gpa: yup.number("GPA to must numeric format").required("GPA is a required field")
    });
    const editEducationSchema = yup.object({
      education_name: yup.string().required("education name is a required field"),
      education_city: yup.string().required("education city is a required field"),
      education_year_from: yup.number("[education year from] must numeric format").required("[education year from] is a required field"),
      education_year_to: yup.number("[education year to] must numeric format").required("[education year to] is a required field"),
      education_gpa: yup.number("GPA to must numeric format").required("GPA is a required field")
    });
    const handleSubmit = (values, actions) => {
      if (editing.value) {
        updateEducation(values, actions);
      } else {
        createEducation(values, actions);
      }
    };
    const getEducations = async (page = 1) => {
      await axios.get(`/api/educations?page=${page}`, {
        params: {
          query: searchQuery.value
        }
      }).then((response) => {
        educations.value = response.data.data;
        selectedEducations.value = [];
        selectAll.value = false;
      }).catch((error) => {
        selectedEducations.value = [];
        selectAll.value = false;
      });
    };
    const createEducation = async (values, { resetForm, setErrors }) => {
      await axios.post("/api/educations", values).then((response) => {
        educations.value.data.unshift(response.data.data);
        $("#educationFormModal").modal("hide");
        resetForm();
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        if (error.response.data.message) {
          setErrors(error.response.data.message);
        }
      });
    };
    const editEducation = (education) => {
      editing.value = true;
      $("#educationFormModal").modal("show");
      formValues.value = {
        id: education.id,
        education_name: education.education_name,
        education_city: education.education_city,
        education_major: education.education_major,
        education_year_from: education.education_year_from,
        education_year_to: education.education_year_to,
        education_gpa: education.education_gpa
      };
    };
    const updateEducation = async (values, actions) => {
      await axios.post("/api/educations/" + formValues.value.id, values).then((response) => {
        getEducations();
        $("#educationFormModal").modal("hide");
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    watch(searchQuery, debounce(() => {
      getEducations();
    }, 300));
    const toggleSelection = (education) => {
      const index = selectedEducations.value.indexOf(education.id);
      if (index === -1) {
        selectedEducations.value.push(education.id);
      } else {
        selectedEducations.value.splice(index, 1);
      }
    };
    const confirmEducationDeletion = (id) => {
      educationIdBeingDeleted.value = id;
      $("#deleteEducationModal").modal("show");
    };
    onMounted(() => {
      getEducations();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<!--[--><div class="content-header"><div class="container-fluid"><div class="row mb-2"><div class="col-sm-6"><h1 class="m-0">List Educations</h1></div><div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/dashboard" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active">List Educations</li></ol></div></div></div></div><div class="content"><div class="container-fluid"><div class="card"><div class="card-body"><div class="d-flex justify-content-between"><div><button type="button" class="btn btn-primary mb-2"><i class="fa fa-plus-circle mr-1"></i> Add New Education </button>`);
      if (selectedEducations.value.length > 0) {
        _push(`<button type="button" class="btn btn-danger mb-2 ml-2"><i class="fa fa-trash mr-1"></i> Delete Selected </button>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedEducations.value.length > 0) {
        _push(`<span class="ml-2"> Selected <span class="text-danger">${ssrInterpolate(selectedEducations.value.length)}</span> educations </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="form-control" placeholder="Search..."></div></div><table class="table table-bordered"><thead><tr class="text-center"><th><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectAll.value) ? ssrLooseContain(selectAll.value, null) : selectAll.value) ? " checked" : ""}></th><th style="${ssrRenderStyle({ "width": "10px" })}">#</th><th>Name</th><th>City</th><th>Major</th><th>Year From</th><th>Year To</th><th>GPA</th><th>Options</th></tr></thead>`);
      if (educations.value.data.length > 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(educations.value.data, (education, index) => {
          _push(ssrRenderComponent(_sfc_main$5, {
            key: education.id,
            education,
            index,
            onEditEducation: editEducation,
            onConfirmEducationDeletion: confirmEducationDeletion,
            onToggleSelection: toggleSelection,
            "select-all": selectAll.value
          }, null, _parent));
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(`<tbody><tr><td colspan="9" class="text-center"> No results found... </td></tr></tbody>`);
      }
      _push(`</table></div></div>`);
      _push(ssrRenderComponent(unref(Bootstrap4Pagination), {
        data: educations.value,
        onPaginationChangePage: getEducations
      }, null, _parent));
      _push(`</div></div><div class="modal" id="educationFormModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">`);
      if (editing.value) {
        _push(`<span>Edit Existing Education</span>`);
      } else {
        _push(`<span>Add New Education</span>`);
      }
      _push(`</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "form",
        ref: form,
        onSubmit: handleSubmit,
        "validation-schema": editing.value ? unref(editEducationSchema) : unref(createEducationSchema),
        "initial-values": formValues.value
      }, {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-body"${_scopeId}><div class="form-group"${_scopeId}><label for="education_name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "education_name",
              type: "text",
              class: ["form-control", { "is-invalid": errors.education_name }],
              id: "education_name",
              placeholder: "Enter education name"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorEducationName" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.education_name)}</span></div><div class="form-group"${_scopeId}><label for="education_city"${_scopeId}>City</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "education_city",
              type: "text",
              class: ["form-control", { "is-invalid": errors.education_city }],
              id: "education_city",
              placeholder: "Enter education city"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorEducationCity" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.education_city)}</span></div><div class="form-group"${_scopeId}><label for="education_major"${_scopeId}>Major</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "education_major",
              type: "text",
              class: ["form-control", { "is-invalid": errors.education_major }],
              id: "education_major",
              placeholder: "Enter education major"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorEducationMajor" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.education_major)}</span></div><div class="form-group"${_scopeId}><label for="education_year_from"${_scopeId}>Year From</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "education_year_from",
              type: "number",
              class: ["form-control", { "is-invalid": errors.education_year_from }],
              id: "education_year_from",
              placeholder: "Enter education year from"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorEducationYearFrom" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.education_year_from)}</span></div><div class="form-group"${_scopeId}><label for="education_year_to"${_scopeId}>Year To</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "education_year_to",
              type: "number",
              class: ["form-control", { "is-invalid": errors.education_year_to }],
              id: "education_year_to",
              placeholder: "Enter education year to"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorEducationYearTo" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.education_year_to)}</span></div><div class="form-group"${_scopeId}><label for="education_gpa"${_scopeId}>GPA</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "education_gpa",
              type: "number",
              class: ["form-control", { "is-invalid": errors.education_gpa }],
              id: "education_gpa",
              placeholder: "Enter GPA"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorGPA" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.education_gpa)}</span></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-secondary" data-dismiss="modal"${_scopeId}>Close</button><button type="submit" class="btn btn-primary"${_scopeId}>Save</button></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-body" }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "education_name" }, "Name"),
                  createVNode(unref(Field), {
                    name: "education_name",
                    type: "text",
                    class: ["form-control", { "is-invalid": errors.education_name }],
                    id: "education_name",
                    placeholder: "Enter education name"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorEducationName",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.education_name), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "education_city" }, "City"),
                  createVNode(unref(Field), {
                    name: "education_city",
                    type: "text",
                    class: ["form-control", { "is-invalid": errors.education_city }],
                    id: "education_city",
                    placeholder: "Enter education city"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorEducationCity",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.education_city), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "education_major" }, "Major"),
                  createVNode(unref(Field), {
                    name: "education_major",
                    type: "text",
                    class: ["form-control", { "is-invalid": errors.education_major }],
                    id: "education_major",
                    placeholder: "Enter education major"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorEducationMajor",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.education_major), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "education_year_from" }, "Year From"),
                  createVNode(unref(Field), {
                    name: "education_year_from",
                    type: "number",
                    class: ["form-control", { "is-invalid": errors.education_year_from }],
                    id: "education_year_from",
                    placeholder: "Enter education year from"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorEducationYearFrom",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.education_year_from), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "education_year_to" }, "Year To"),
                  createVNode(unref(Field), {
                    name: "education_year_to",
                    type: "number",
                    class: ["form-control", { "is-invalid": errors.education_year_to }],
                    id: "education_year_to",
                    placeholder: "Enter education year to"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorEducationYearTo",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.education_year_to), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "education_gpa" }, "GPA"),
                  createVNode(unref(Field), {
                    name: "education_gpa",
                    type: "number",
                    class: ["form-control", { "is-invalid": errors.education_gpa }],
                    id: "education_gpa",
                    placeholder: "Enter GPA"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorGPA",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.education_gpa), 1)
                ])
              ]),
              createVNode("div", { class: "modal-footer" }, [
                createVNode("button", {
                  type: "button",
                  class: "btn btn-secondary",
                  "data-dismiss": "modal"
                }, "Close"),
                createVNode("button", {
                  type: "submit",
                  class: "btn btn-primary"
                }, "Save")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="modal" id="deleteEducationModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title"><span>Delete Education</span></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><h5>Are you sure you want to delete this education ?</h5></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">No</button><button type="button" class="btn btn-danger">Yes</button></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/education/EducationList.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "WorkExperienceListItem",
  __ssrInlineRender: true,
  props: {
    we: Object,
    index: Number,
    selectAll: Boolean
  },
  emits: ["weDeleted", "editWe", "confirmWeDeletion"],
  setup(__props, { emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<tr${ssrRenderAttrs(_attrs)}><th class="text-center"><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectAll) ? " checked" : ""}></th><td class="text-center">${ssrInterpolate(__props.index + 1)}</td><td>${ssrInterpolate(__props.we.work_experience_name)}</td><td>${ssrInterpolate(__props.we.work_experience_city)}</td><td class="text-center">${ssrInterpolate(__props.we.work_experience_year_from)}</td><td class="text-center">${ssrInterpolate(__props.we.work_experience_year_to)}</td><td>${ssrInterpolate(__props.we.work_experience_position)}</td><td>${ssrInterpolate(__props.we.work_experience_job_description)}</td><td>${ssrInterpolate(__props.we.work_experience_reason_to_leave)}</td><td class="text-center">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "#",
        onClick: ($event) => _ctx.$emit("editWe", __props.we)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-edit"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-edit" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`  `);
      _push(ssrRenderComponent(_component_router_link, {
        to: "#",
        onClick: ($event) => _ctx.$emit("confirmWeDeletion", __props.we.id)
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa fa-trash text-danger"${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "fa fa-trash text-danger" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</td></tr>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/work_experiences/WorkExperienceListItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "WorkExperienceList",
  __ssrInlineRender: true,
  setup(__props) {
    const wes = ref({
      "data": []
    });
    const editing = ref(false);
    const formValues = ref();
    const form = ref(null);
    const searchQuery = ref(null);
    const selectedWes = ref([]);
    const selectAll = ref(false);
    const weIdBeingDeleted = ref(null);
    const createWeSchema = yup.object({
      we_name: yup.string().required("work experience name is a required field"),
      we_city: yup.string().required("work experience city is a required field"),
      we_year_from: yup.number("[work experience year from] must numeric format").required("[work experience year from] is a required field"),
      we_year_to: yup.number("[work experience year to] must numeric format").required("[work experience year to] is a required field"),
      we_position: yup.string().required("work experience position is a required field"),
      we_job_description: yup.string().required("work experience job description is a required field"),
      we_reason_to_leave: yup.string().required("work experience reason to leave is a required field")
    });
    const editWeSchema = yup.object({
      we_name: yup.string().required("work experience name is a required field"),
      we_city: yup.string().required("work experience city is a required field"),
      we_year_from: yup.number("[work experience year from] must numeric format").required("[work experience year from] is a required field"),
      we_year_to: yup.number("[work experience year to] must numeric format").required("[work experience year to] is a required field"),
      we_position: yup.string().required("work experience position is a required field"),
      we_job_description: yup.string().required("work experience job description is a required field"),
      we_reason_to_leave: yup.string().required("work experience reason to leave is a required field")
    });
    const handleSubmit = (values, actions) => {
      if (editing.value) {
        updateWe(values, actions);
      } else {
        createWe(values, actions);
      }
    };
    const getWes = async (page = 1) => {
      await axios.get(`/api/work_experiences?page=${page}`, {
        params: {
          query: searchQuery.value
        }
      }).then((response) => {
        wes.value = response.data.data;
        selectedWes.value = [];
        selectAll.value = false;
      }).catch((error) => {
        selectedWes.value = [];
        selectAll.value = false;
      });
    };
    const createWe = async (values, { resetForm, setErrors }) => {
      await axios.post("/api/work_experiences", values).then((response) => {
        wes.value.data.unshift(response.data.data);
        $("#weFormModal").modal("hide");
        resetForm();
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        if (error.response.data.message) {
          setErrors(error.response.data.message);
        }
      });
    };
    const editWe = (we) => {
      editing.value = true;
      $("#weFormModal").modal("show");
      formValues.value = {
        id: we.id,
        we_name: we.work_experience_name,
        we_city: we.work_experience_city,
        we_year_from: we.work_experience_year_from,
        we_year_to: we.work_experience_year_to,
        we_position: we.work_experience_position,
        we_job_description: we.work_experience_job_description,
        we_reason_to_leave: we.work_experience_reason_to_leave
      };
    };
    const updateWe = async (values, actions) => {
      await axios.post("/api/work_experiences/" + formValues.value.id, values).then((response) => {
        getWes();
        $("#weFormModal").modal("hide");
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    watch(searchQuery, debounce(() => {
      getWes();
    }, 300));
    const toggleSelection = (we) => {
      const index = selectedWes.value.indexOf(we.id);
      if (index === -1) {
        selectedWes.value.push(we.id);
      } else {
        selectedWes.value.splice(index, 1);
      }
    };
    const confirmWeDeletion = (id) => {
      weIdBeingDeleted.value = id;
      $("#deleteWeModal").modal("show");
    };
    onMounted(() => {
      getWes();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<!--[--><div class="content-header"><div class="container-fluid"><div class="row mb-2"><div class="col-sm-6"><h1 class="m-0">List Work Experience</h1></div><div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/dashboard" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active">List Work Experience</li></ol></div></div></div></div><div class="content"><div class="container-fluid"><div class="card"><div class="card-body"><div class="d-flex justify-content-between"><div><button type="button" class="btn btn-primary mb-2"><i class="fa fa-plus-circle mr-1"></i> Add New Work Experience </button>`);
      if (selectedWes.value.length > 0) {
        _push(`<button type="button" class="btn btn-danger mb-2 ml-2"><i class="fa fa-trash mr-1"></i> Delete Selected </button>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedWes.value.length > 0) {
        _push(`<span class="ml-2"> Selected <span class="text-danger">${ssrInterpolate(selectedWes.value.length)}</span> work experiences </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="form-control" placeholder="Search..."></div></div><table class="table table-bordered"><thead><tr class="text-center"><th><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectAll.value) ? ssrLooseContain(selectAll.value, null) : selectAll.value) ? " checked" : ""}></th><th style="${ssrRenderStyle({ "width": "10px" })}">#</th><th>Name</th><th>City</th><th>Year From</th><th>Year To</th><th>Position</th><th>Job Description</th><th>Reason to Leave</th><th>Options</th></tr></thead>`);
      if (wes.value.data.length > 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(wes.value.data, (we, index) => {
          _push(ssrRenderComponent(_sfc_main$3, {
            key: we.id,
            we,
            index,
            onEditWe: editWe,
            onConfirmWeDeletion: confirmWeDeletion,
            onToggleSelection: toggleSelection,
            "select-all": selectAll.value
          }, null, _parent));
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(`<tbody><tr><td colspan="10" class="text-center"> No results found... </td></tr></tbody>`);
      }
      _push(`</table></div></div>`);
      _push(ssrRenderComponent(unref(Bootstrap4Pagination), {
        data: wes.value,
        onPaginationChangePage: getWes
      }, null, _parent));
      _push(`</div></div><div class="modal" id="weFormModal" tabindex="-1" role="dialog"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">`);
      if (editing.value) {
        _push(`<span>Edit Existing Work Experience</span>`);
      } else {
        _push(`<span>Add New Work Experience</span>`);
      }
      _push(`</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>`);
      _push(ssrRenderComponent(unref(Form), {
        ref_key: "form",
        ref: form,
        onSubmit: handleSubmit,
        "validation-schema": editing.value ? unref(editWeSchema) : unref(createWeSchema),
        "initial-values": formValues.value
      }, {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-body"${_scopeId}><div class="form-group"${_scopeId}><label for="we_name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "we_name",
              type: "text",
              class: ["form-control", { "is-invalid": errors.we_name }],
              id: "we_name",
              placeholder: "Enter name"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorWeName" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.we_name)}</span></div><div class="form-group"${_scopeId}><label for="we_city"${_scopeId}>City</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "we_city",
              type: "text",
              class: ["form-control", { "is-invalid": errors.we_city }],
              id: "we_city",
              placeholder: "Enter city"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorWeCity" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.we_city)}</span></div><div class="form-group"${_scopeId}><label for="we_year_from"${_scopeId}>Year From</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "we_year_from",
              type: "number",
              class: ["form-control", { "is-invalid": errors.we_year_from }],
              id: "we_year_from",
              placeholder: "Enter year from"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorWeYearFrom" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.we_year_from)}</span></div><div class="form-group"${_scopeId}><label for="we_year_to"${_scopeId}>Year To</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "we_year_to",
              type: "number",
              class: ["form-control", { "is-invalid": errors.we_year_to }],
              id: "we_year_to",
              placeholder: "Enter year to"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorWeYearTo" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.we_year_to)}</span></div><div class="form-group"${_scopeId}><label for="we_position"${_scopeId}>Position</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "we_position",
              type: "text",
              class: ["form-control", { "is-invalid": errors.we_position }],
              id: "we_position",
              placeholder: "Enter position"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorWePosition" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.we_position)}</span></div><div class="form-group"${_scopeId}><label for="we_job_description"${_scopeId}>Job Description</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "we_job_description",
              as: "textarea",
              class: ["form-control", { "is-invalid": errors.we_job_description }],
              cols: "30",
              rows: "3",
              id: "we_job_description",
              placeholder: "Enter job description"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorWeJobDescription" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.we_job_description)}</span></div><div class="form-group"${_scopeId}><label for="we_reason_to_leave"${_scopeId}>Reason to Leave</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "we_reason_to_leave",
              as: "textarea",
              class: ["form-control", { "is-invalid": errors.we_reason_to_leave }],
              cols: "30",
              rows: "3",
              id: "we_reason_to_leave",
              placeholder: "Enter reason to leave"
            }, null, _parent2, _scopeId));
            _push2(`<span id="errorWeReasonToLeave" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.we_reason_to_leave)}</span></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-secondary" data-dismiss="modal"${_scopeId}>Close</button><button type="submit" class="btn btn-primary"${_scopeId}>Save</button></div>`);
          } else {
            return [
              createVNode("div", { class: "modal-body" }, [
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "we_name" }, "Name"),
                  createVNode(unref(Field), {
                    name: "we_name",
                    type: "text",
                    class: ["form-control", { "is-invalid": errors.we_name }],
                    id: "we_name",
                    placeholder: "Enter name"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorWeName",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.we_name), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "we_city" }, "City"),
                  createVNode(unref(Field), {
                    name: "we_city",
                    type: "text",
                    class: ["form-control", { "is-invalid": errors.we_city }],
                    id: "we_city",
                    placeholder: "Enter city"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorWeCity",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.we_city), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "we_year_from" }, "Year From"),
                  createVNode(unref(Field), {
                    name: "we_year_from",
                    type: "number",
                    class: ["form-control", { "is-invalid": errors.we_year_from }],
                    id: "we_year_from",
                    placeholder: "Enter year from"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorWeYearFrom",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.we_year_from), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "we_year_to" }, "Year To"),
                  createVNode(unref(Field), {
                    name: "we_year_to",
                    type: "number",
                    class: ["form-control", { "is-invalid": errors.we_year_to }],
                    id: "we_year_to",
                    placeholder: "Enter year to"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorWeYearTo",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.we_year_to), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "we_position" }, "Position"),
                  createVNode(unref(Field), {
                    name: "we_position",
                    type: "text",
                    class: ["form-control", { "is-invalid": errors.we_position }],
                    id: "we_position",
                    placeholder: "Enter position"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorWePosition",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.we_position), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "we_job_description" }, "Job Description"),
                  createVNode(unref(Field), {
                    name: "we_job_description",
                    as: "textarea",
                    class: ["form-control", { "is-invalid": errors.we_job_description }],
                    cols: "30",
                    rows: "3",
                    id: "we_job_description",
                    placeholder: "Enter job description"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorWeJobDescription",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.we_job_description), 1)
                ]),
                createVNode("div", { class: "form-group" }, [
                  createVNode("label", { for: "we_reason_to_leave" }, "Reason to Leave"),
                  createVNode(unref(Field), {
                    name: "we_reason_to_leave",
                    as: "textarea",
                    class: ["form-control", { "is-invalid": errors.we_reason_to_leave }],
                    cols: "30",
                    rows: "3",
                    id: "we_reason_to_leave",
                    placeholder: "Enter reason to leave"
                  }, null, 8, ["class"]),
                  createVNode("span", {
                    id: "errorWeReasonToLeave",
                    class: "invalid-feedback"
                  }, toDisplayString(errors.we_reason_to_leave), 1)
                ])
              ]),
              createVNode("div", { class: "modal-footer" }, [
                createVNode("button", {
                  type: "button",
                  class: "btn btn-secondary",
                  "data-dismiss": "modal"
                }, "Close"),
                createVNode("button", {
                  type: "submit",
                  class: "btn btn-primary"
                }, "Save")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="modal" id="deleteWeModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title"><span>Delete Work Experience</span></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><h5>Are you sure you want to delete this work experience ?</h5></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">No</button><button type="button" class="btn btn-danger">Yes</button></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/work_experiences/WorkExperienceList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "PortfolioList",
  __ssrInlineRender: true,
  setup(__props) {
    const portfolios = ref({
      "data": []
    });
    const searchQuery = ref(null);
    const getPortfolios = async (page = 1) => {
      await axios.get(`/api/portfolios?page=${page}`, {
        params: {
          query: searchQuery.value
        }
      }).then((response) => {
        portfolios.value = response.data.data;
      });
    };
    onMounted(() => {
      getPortfolios();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<!--[--><div class="content-header"><div class="container-fluid"><div class="row mb-2"><div class="col-sm-6"><h1 class="m-0">List Portfolios</h1></div><div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/dashboard" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active">List Portfolios</li></ol></div></div></div></div><div class="content"><div class="container-fluid"><div class="row"><div class="col-lg-12"><div class="card"><div class="card-body"><div class="d-flex justify-content-between mb-2"><div>`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/portfolios/create" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="btn btn-primary"${_scopeId}><i class="fa fa-plus-circle mr-1"${_scopeId}></i> Add New Portfolio </button>`);
          } else {
            return [
              createVNode("button", { class: "btn btn-primary" }, [
                createVNode("i", { class: "fa fa-plus-circle mr-1" }),
                createTextVNode(" Add New Portfolio ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><table class="table table-bordered"><thead><tr class="text-center"><th scope="col">#</th><th scope="col">Project Name</th><th scope="col">Project Category</th><th scope="col">Project Year</th><th scope="col">Project URL</th><th scope="col">Project Description</th><th scope="col">Options</th></tr></thead>`);
      if (portfolios.value.data.length > 0) {
        _push(`<tbody><!--[-->`);
        ssrRenderList(portfolios.value.data, (portfolio, index) => {
          _push(`<tr><td class="text-center">${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(portfolio.project_name)}</td><td class="text-center">${ssrInterpolate(portfolio.portfolio_category.category_name)}</td><td class="text-center">${ssrInterpolate(portfolio.project_year)}</td><td>${ssrInterpolate(portfolio.project_url)}</td><td>${ssrInterpolate(portfolio.project_description)}</td><td class="text-center">`);
          _push(ssrRenderComponent(_component_router_link, {
            to: `/admin/portfolios/${portfolio.id}`
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="fa fa-edit mr-2"${_scopeId}></i>`);
              } else {
                return [
                  createVNode("i", { class: "fa fa-edit mr-2" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<a href="#"><i class="fa fa-trash text-danger"></i></a></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(`<tbody><tr><td colspan="7" class="text-center"> No results found... </td></tr></tbody>`);
      }
      _push(`</table></div></div>`);
      _push(ssrRenderComponent(unref(Bootstrap4Pagination), {
        data: portfolios.value,
        onPaginationChangePage: getPortfolios
      }, null, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/portfolio/PortfolioList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "PortfolioForm",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      project_name: "",
      portfolio_category_id: "",
      project_year: "",
      project_url: "",
      project_description: ""
    });
    const route = useRoute();
    const router2 = useRouter();
    const portfolio_categories = ref();
    const editMode = ref(false);
    const getPortfolioCategory = async (actions) => {
      await axios.get("/api/portfolios/categories/all").then((response) => {
        portfolio_categories.value = response.data.data;
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    const handleSubmit = async (values, actions) => {
      if (editMode.value) {
        updatePortfolio(values, actions);
      } else {
        createPortfolio(values, actions);
      }
    };
    const createPortfolio = async (values, actions) => {
      await axios.post("/api/portfolios", form).then((response) => {
        router2.push("/admin/portfolios");
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    const updatePortfolio = async (values, actions) => {
      await axios.post(`/api/portfolios/${route.params.id}`, form).then((response) => {
        router2.push("/admin/portfolios");
        Toast.fire({
          icon: "success",
          title: response.data.message
        });
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    const getPortfolio = async (actions) => {
      await axios.get(`/api/portfolios/${route.params.id}`).then((response) => {
        form.project_name = response.data.data.project_name;
        form.portfolio_category_id = response.data.data.portfolio_category_id;
        form.project_year = response.data.data.project_year;
        form.project_url = response.data.data.project_url;
        form.project_description = response.data.data.project_description;
      }).catch((error) => {
        actions.setErrors(error.response.data.message);
      });
    };
    onMounted(() => {
      if (route.name === "admin.portfolios.edit") {
        editMode.value = true;
        getPortfolio();
      }
      getPortfolioCategory();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<!--[--><div class="content-header"><div class="container-fluid"><div class="row mb-2"><div class="col-sm-6"><h1 class="m-0">`);
      if (editMode.value) {
        _push(`<span>Edit</span>`);
      } else {
        _push(`<span>Create</span>`);
      }
      _push(` Portfolio </h1></div><div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/dashboard" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item">`);
      _push(ssrRenderComponent(_component_router_link, { to: "/admin/portfolios" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Appointments`);
          } else {
            return [
              createTextVNode("Appointments")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="breadcrumb-item active">`);
      if (editMode.value) {
        _push(`<span>Edit</span>`);
      } else {
        _push(`<span>Create</span>`);
      }
      _push(`</li></ol></div></div></div></div><div class="content"><div class="container-fluid"><div class="row"><div class="col-lg-12"><div class="card"><div class="card-body">`);
      _push(ssrRenderComponent(unref(Form), { onSubmit: handleSubmit }, {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="project_name"${_scopeId}>Project Name</label><input${ssrRenderAttr("value", form.project_name)} type="text" name="project_name" id="project_name" placeholder="Enter project name" class="${ssrRenderClass([{ "is-invalid": errors.project_name }, "form-control"])}"${_scopeId}><span id="errorProjectName" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.project_name)}</span></div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="portfolio_category"${_scopeId}>Category</label><select id="portfolio_category" class="${ssrRenderClass([{ "is-invalid": errors.portfolio_category_id }, "form-control"])}"${_scopeId}><!--[-->`);
            ssrRenderList(portfolio_categories.value, (portfolio_category) => {
              _push2(`<option${ssrRenderAttr("value", portfolio_category.id)}${_scopeId}>${ssrInterpolate(portfolio_category.category_name)}</option>`);
            });
            _push2(`<!--]--></select><span id="errorPortfolioCategory" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.portfolio_category_id)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="project_year"${_scopeId}>Year</label><input${ssrRenderAttr("value", form.project_year)} type="number" name="project_year" id="project_year" placeholder="Enter project year" class="${ssrRenderClass([{ "is-invalid": errors.project_year }, "form-control"])}"${_scopeId}><span id="errorProjectYear" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.project_year)}</span></div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><label for="project_url"${_scopeId}>URL</label><input${ssrRenderAttr("value", form.project_url)} type="text" name="project_url" id="project_url" placeholder="Enter project URL" class="${ssrRenderClass([{ "is-invalid": errors.project_url }, "form-control"])}"${_scopeId}><span id="errorProjectURL" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.project_url)}</span></div></div></div><div class="row"${_scopeId}><div class="col-md-12"${_scopeId}><div class="form-group"${_scopeId}><label for="project_description"${_scopeId}>Project Description</label><textarea type="text" cols="30" rows="2" name="project_description" id="project_description" placeholder="Enter project description" class="${ssrRenderClass([{ "is-invalid": errors.project_description }, "form-control"])}"${_scopeId}>${ssrInterpolate(form.project_description)}</textarea><span id="errorProjectDescription" class="invalid-feedback"${_scopeId}>${ssrInterpolate(errors.project_description)}</span></div></div></div><button type="submit" class="btn btn-primary"${_scopeId}>Submit</button>`);
          } else {
            return [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "project_name" }, "Project Name"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.project_name = $event,
                      type: "text",
                      class: ["form-control", { "is-invalid": errors.project_name }],
                      name: "project_name",
                      id: "project_name",
                      placeholder: "Enter project name"
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, form.project_name]
                    ]),
                    createVNode("span", {
                      id: "errorProjectName",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.project_name), 1)
                  ])
                ]),
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "portfolio_category" }, "Category"),
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => form.portfolio_category_id = $event,
                      id: "portfolio_category",
                      class: ["form-control", { "is-invalid": errors.portfolio_category_id }]
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(portfolio_categories.value, (portfolio_category) => {
                        return openBlock(), createBlock("option", {
                          key: portfolio_category.id,
                          value: portfolio_category.id
                        }, toDisplayString(portfolio_category.category_name), 9, ["value"]);
                      }), 128))
                    ], 10, ["onUpdate:modelValue"]), [
                      [vModelSelect, form.portfolio_category_id]
                    ]),
                    createVNode("span", {
                      id: "errorPortfolioCategory",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.portfolio_category_id), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "project_year" }, "Year"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.project_year = $event,
                      type: "number",
                      class: ["form-control", { "is-invalid": errors.project_year }],
                      name: "project_year",
                      id: "project_year",
                      placeholder: "Enter project year"
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, form.project_year]
                    ]),
                    createVNode("span", {
                      id: "errorProjectYear",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.project_year), 1)
                  ])
                ]),
                createVNode("div", { class: "col-md-6" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "project_url" }, "URL"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => form.project_url = $event,
                      type: "text",
                      class: ["form-control", { "is-invalid": errors.project_url }],
                      name: "project_url",
                      id: "project_url",
                      placeholder: "Enter project URL"
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, form.project_url]
                    ]),
                    createVNode("span", {
                      id: "errorProjectURL",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.project_url), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-md-12" }, [
                  createVNode("div", { class: "form-group" }, [
                    createVNode("label", { for: "project_description" }, "Project Description"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => form.project_description = $event,
                      type: "text",
                      class: ["form-control", { "is-invalid": errors.project_description }],
                      cols: "30",
                      rows: "2",
                      name: "project_description",
                      id: "project_description",
                      placeholder: "Enter project description"
                    }, null, 10, ["onUpdate:modelValue"]), [
                      [vModelText, form.project_description]
                    ]),
                    createVNode("span", {
                      id: "errorProjectDescription",
                      class: "invalid-feedback"
                    }, toDisplayString(errors.project_description), 1)
                  ])
                ])
              ]),
              createVNode("button", {
                type: "submit",
                class: "btn btn-primary"
              }, "Submit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/portfolio/PortfolioForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const routes = [
  {
    path: "/login",
    name: "admin.login",
    component: _sfc_main$b
  },
  {
    path: "/admin/dashboard",
    name: "admin.dashboard",
    component: _sfc_main$9
  },
  {
    path: "/admin/about",
    name: "admin.about",
    component: _sfc_main$8
  },
  {
    path: "/admin/skills",
    name: "admin.skills",
    component: _sfc_main$6
  },
  {
    path: "/admin/educations",
    name: "admin.educations",
    component: _sfc_main$4
  },
  {
    path: "/admin/work_experiences",
    name: "admin.work_experiences",
    component: _sfc_main$2
  },
  {
    path: "/admin/portfolios",
    name: "admin.portfolios",
    component: _sfc_main$1
  },
  {
    path: "/admin/portfolios/create",
    name: "admin.portfolios.create",
    component: _sfc_main
  },
  {
    path: "/admin/portfolios/:id",
    name: "admin.portfolios.edit",
    component: _sfc_main
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
window.Swal = Swal;
const Toast$1 = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3e3,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
window.Toast = Toast$1;
const app = createApp({});
app.use(router);
app.component("Login", _sfc_main$b);
app.component("Register", _sfc_main$a);
app.mount("#app");
