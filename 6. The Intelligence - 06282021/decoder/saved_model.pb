��
��
B
AssignVariableOp
resource
value"dtype"
dtypetype�
~
BiasAdd

value"T	
bias"T
output"T" 
Ttype:
2	"-
data_formatstringNHWC:
NHWCNCHW
8
Const
output"dtype"
valuetensor"
dtypetype
�
Conv2DBackpropInput
input_sizes
filter"T
out_backprop"T
output"T"
Ttype:	
2"
strides	list(int)"
use_cudnn_on_gpubool(",
paddingstring:
SAMEVALIDEXPLICIT""
explicit_paddings	list(int)
 "-
data_formatstringNHWC:
NHWCNCHW" 
	dilations	list(int)

.
Identity

input"T
output"T"	
Ttype
\
	LeakyRelu
features"T
activations"T"
alphafloat%��L>"
Ttype0:
2
q
MatMul
a"T
b"T
product"T"
transpose_abool( "
transpose_bbool( "
Ttype:

2	
e
MergeV2Checkpoints
checkpoint_prefixes
destination_prefix"
delete_old_dirsbool(�

NoOp
M
Pack
values"T*N
output"T"
Nint(0"	
Ttype"
axisint 
C
Placeholder
output"dtype"
dtypetype"
shapeshape:
@
ReadVariableOp
resource
value"dtype"
dtypetype�
[
Reshape
tensor"T
shape"Tshape
output"T"	
Ttype"
Tshapetype0:
2	
o
	RestoreV2

prefix
tensor_names
shape_and_slices
tensors2dtypes"
dtypes
list(type)(0�
l
SaveV2

prefix
tensor_names
shape_and_slices
tensors2dtypes"
dtypes
list(type)(0�
?
Select
	condition

t"T
e"T
output"T"	
Ttype
P
Shape

input"T
output"out_type"	
Ttype"
out_typetype0:
2	
H
ShardedFilename
basename	
shard

num_shards
filename
0
Sigmoid
x"T
y"T"
Ttype:

2
�
StatefulPartitionedCall
args2Tin
output2Tout"
Tin
list(type)("
Tout
list(type)("	
ffunc"
configstring "
config_protostring "
executor_typestring �
@
StaticRegexFullMatch	
input

output
"
patternstring
�
StridedSlice

input"T
begin"Index
end"Index
strides"Index
output"T"	
Ttype"
Indextype:
2	"

begin_maskint "
end_maskint "
ellipsis_maskint "
new_axis_maskint "
shrink_axis_maskint 
N

StringJoin
inputs*N

output"
Nint(0"
	separatorstring 
�
VarHandleOp
resource"
	containerstring "
shared_namestring "
dtypetype"
shapeshape"#
allowed_deviceslist(string)
 �"serve*2.5.02v2.5.0-0-ga4dfb8d1a718ّ	
v
dense/kernelVarHandleOp*
_output_shapes
: *
dtype0*
shape:

��*
shared_namedense/kernel
o
 dense/kernel/Read/ReadVariableOpReadVariableOpdense/kernel* 
_output_shapes
:

��*
dtype0
n

dense/biasVarHandleOp*
_output_shapes
: *
dtype0*
shape:��*
shared_name
dense/bias
g
dense/bias/Read/ReadVariableOpReadVariableOp
dense/bias*
_output_shapes

:��*
dtype0
�
decoder_conv_t_0/kernelVarHandleOp*
_output_shapes
: *
dtype0*
shape:@@*(
shared_namedecoder_conv_t_0/kernel
�
+decoder_conv_t_0/kernel/Read/ReadVariableOpReadVariableOpdecoder_conv_t_0/kernel*&
_output_shapes
:@@*
dtype0
�
decoder_conv_t_0/biasVarHandleOp*
_output_shapes
: *
dtype0*
shape:@*&
shared_namedecoder_conv_t_0/bias
{
)decoder_conv_t_0/bias/Read/ReadVariableOpReadVariableOpdecoder_conv_t_0/bias*
_output_shapes
:@*
dtype0
�
decoder_conv_t_1/kernelVarHandleOp*
_output_shapes
: *
dtype0*
shape:@@*(
shared_namedecoder_conv_t_1/kernel
�
+decoder_conv_t_1/kernel/Read/ReadVariableOpReadVariableOpdecoder_conv_t_1/kernel*&
_output_shapes
:@@*
dtype0
�
decoder_conv_t_1/biasVarHandleOp*
_output_shapes
: *
dtype0*
shape:@*&
shared_namedecoder_conv_t_1/bias
{
)decoder_conv_t_1/bias/Read/ReadVariableOpReadVariableOpdecoder_conv_t_1/bias*
_output_shapes
:@*
dtype0
�
decoder_conv_t_2/kernelVarHandleOp*
_output_shapes
: *
dtype0*
shape: @*(
shared_namedecoder_conv_t_2/kernel
�
+decoder_conv_t_2/kernel/Read/ReadVariableOpReadVariableOpdecoder_conv_t_2/kernel*&
_output_shapes
: @*
dtype0
�
decoder_conv_t_2/biasVarHandleOp*
_output_shapes
: *
dtype0*
shape: *&
shared_namedecoder_conv_t_2/bias
{
)decoder_conv_t_2/bias/Read/ReadVariableOpReadVariableOpdecoder_conv_t_2/bias*
_output_shapes
: *
dtype0
�
decoder_conv_t_3/kernelVarHandleOp*
_output_shapes
: *
dtype0*
shape: *(
shared_namedecoder_conv_t_3/kernel
�
+decoder_conv_t_3/kernel/Read/ReadVariableOpReadVariableOpdecoder_conv_t_3/kernel*&
_output_shapes
: *
dtype0
�
decoder_conv_t_3/biasVarHandleOp*
_output_shapes
: *
dtype0*
shape:*&
shared_namedecoder_conv_t_3/bias
{
)decoder_conv_t_3/bias/Read/ReadVariableOpReadVariableOpdecoder_conv_t_3/bias*
_output_shapes
:*
dtype0

NoOpNoOp
�%
ConstConst"/device:CPU:0*
_output_shapes
: *
dtype0*�%
value�%B�% B�%
�
layer-0
layer_with_weights-0
layer-1
layer-2
layer_with_weights-1
layer-3
layer-4
layer_with_weights-2
layer-5
layer-6
layer_with_weights-3
layer-7
	layer-8

layer_with_weights-4

layer-9
layer-10
	variables
regularization_losses
trainable_variables
	keras_api

signatures
 
h

kernel
bias
	variables
regularization_losses
trainable_variables
	keras_api
R
	variables
regularization_losses
trainable_variables
	keras_api
h

kernel
bias
	variables
regularization_losses
trainable_variables
 	keras_api
R
!	variables
"regularization_losses
#trainable_variables
$	keras_api
h

%kernel
&bias
'	variables
(regularization_losses
)trainable_variables
*	keras_api
R
+	variables
,regularization_losses
-trainable_variables
.	keras_api
h

/kernel
0bias
1	variables
2regularization_losses
3trainable_variables
4	keras_api
R
5	variables
6regularization_losses
7trainable_variables
8	keras_api
h

9kernel
:bias
;	variables
<regularization_losses
=trainable_variables
>	keras_api
R
?	variables
@regularization_losses
Atrainable_variables
B	keras_api
F
0
1
2
3
%4
&5
/6
07
98
:9
 
F
0
1
2
3
%4
&5
/6
07
98
:9
�
Cmetrics
Dlayer_metrics
	variables
regularization_losses
Elayer_regularization_losses
Fnon_trainable_variables
trainable_variables

Glayers
 
XV
VARIABLE_VALUEdense/kernel6layer_with_weights-0/kernel/.ATTRIBUTES/VARIABLE_VALUE
TR
VARIABLE_VALUE
dense/bias4layer_with_weights-0/bias/.ATTRIBUTES/VARIABLE_VALUE

0
1
 

0
1
�
Hmetrics
Ilayer_metrics
	variables
regularization_losses
Jlayer_regularization_losses
Knon_trainable_variables
trainable_variables

Llayers
 
 
 
�
Mmetrics
Nlayer_metrics
	variables
regularization_losses
Olayer_regularization_losses
Pnon_trainable_variables
trainable_variables

Qlayers
ca
VARIABLE_VALUEdecoder_conv_t_0/kernel6layer_with_weights-1/kernel/.ATTRIBUTES/VARIABLE_VALUE
_]
VARIABLE_VALUEdecoder_conv_t_0/bias4layer_with_weights-1/bias/.ATTRIBUTES/VARIABLE_VALUE

0
1
 

0
1
�
Rmetrics
Slayer_metrics
	variables
regularization_losses
Tlayer_regularization_losses
Unon_trainable_variables
trainable_variables

Vlayers
 
 
 
�
Wmetrics
Xlayer_metrics
!	variables
"regularization_losses
Ylayer_regularization_losses
Znon_trainable_variables
#trainable_variables

[layers
ca
VARIABLE_VALUEdecoder_conv_t_1/kernel6layer_with_weights-2/kernel/.ATTRIBUTES/VARIABLE_VALUE
_]
VARIABLE_VALUEdecoder_conv_t_1/bias4layer_with_weights-2/bias/.ATTRIBUTES/VARIABLE_VALUE

%0
&1
 

%0
&1
�
\metrics
]layer_metrics
'	variables
(regularization_losses
^layer_regularization_losses
_non_trainable_variables
)trainable_variables

`layers
 
 
 
�
ametrics
blayer_metrics
+	variables
,regularization_losses
clayer_regularization_losses
dnon_trainable_variables
-trainable_variables

elayers
ca
VARIABLE_VALUEdecoder_conv_t_2/kernel6layer_with_weights-3/kernel/.ATTRIBUTES/VARIABLE_VALUE
_]
VARIABLE_VALUEdecoder_conv_t_2/bias4layer_with_weights-3/bias/.ATTRIBUTES/VARIABLE_VALUE

/0
01
 

/0
01
�
fmetrics
glayer_metrics
1	variables
2regularization_losses
hlayer_regularization_losses
inon_trainable_variables
3trainable_variables

jlayers
 
 
 
�
kmetrics
llayer_metrics
5	variables
6regularization_losses
mlayer_regularization_losses
nnon_trainable_variables
7trainable_variables

olayers
ca
VARIABLE_VALUEdecoder_conv_t_3/kernel6layer_with_weights-4/kernel/.ATTRIBUTES/VARIABLE_VALUE
_]
VARIABLE_VALUEdecoder_conv_t_3/bias4layer_with_weights-4/bias/.ATTRIBUTES/VARIABLE_VALUE

90
:1
 

90
:1
�
pmetrics
qlayer_metrics
;	variables
<regularization_losses
rlayer_regularization_losses
snon_trainable_variables
=trainable_variables

tlayers
 
 
 
�
umetrics
vlayer_metrics
?	variables
@regularization_losses
wlayer_regularization_losses
xnon_trainable_variables
Atrainable_variables

ylayers
 
 
 
 
N
0
1
2
3
4
5
6
7
	8

9
10
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
�
serving_default_decoder_inputPlaceholder*'
_output_shapes
:���������
*
dtype0*
shape:���������

�
StatefulPartitionedCallStatefulPartitionedCallserving_default_decoder_inputdense/kernel
dense/biasdecoder_conv_t_0/kerneldecoder_conv_t_0/biasdecoder_conv_t_1/kerneldecoder_conv_t_1/biasdecoder_conv_t_2/kerneldecoder_conv_t_2/biasdecoder_conv_t_3/kerneldecoder_conv_t_3/bias*
Tin
2*
Tout
2*
_collective_manager_ids
 */
_output_shapes
:���������dd*,
_read_only_resource_inputs

	
*-
config_proto

CPU

GPU 2J 8� *-
f(R&
$__inference_signature_wrapper_223077
O
saver_filenamePlaceholder*
_output_shapes
: *
dtype0*
shape: 
�
StatefulPartitionedCall_1StatefulPartitionedCallsaver_filename dense/kernel/Read/ReadVariableOpdense/bias/Read/ReadVariableOp+decoder_conv_t_0/kernel/Read/ReadVariableOp)decoder_conv_t_0/bias/Read/ReadVariableOp+decoder_conv_t_1/kernel/Read/ReadVariableOp)decoder_conv_t_1/bias/Read/ReadVariableOp+decoder_conv_t_2/kernel/Read/ReadVariableOp)decoder_conv_t_2/bias/Read/ReadVariableOp+decoder_conv_t_3/kernel/Read/ReadVariableOp)decoder_conv_t_3/bias/Read/ReadVariableOpConst*
Tin
2*
Tout
2*
_collective_manager_ids
 *
_output_shapes
: * 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *(
f#R!
__inference__traced_save_223458
�
StatefulPartitionedCall_2StatefulPartitionedCallsaver_filenamedense/kernel
dense/biasdecoder_conv_t_0/kerneldecoder_conv_t_0/biasdecoder_conv_t_1/kerneldecoder_conv_t_1/biasdecoder_conv_t_2/kerneldecoder_conv_t_2/biasdecoder_conv_t_3/kerneldecoder_conv_t_3/bias*
Tin
2*
Tout
2*
_collective_manager_ids
 *
_output_shapes
: * 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *+
f&R$
"__inference__traced_restore_223498��
�$
�
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_222712

inputsB
(conv2d_transpose_readvariableop_resource: -
biasadd_readvariableop_resource:
identity��BiasAdd/ReadVariableOp�conv2d_transpose/ReadVariableOpD
ShapeShapeinputs*
T0*
_output_shapes
:2
Shapet
strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice/stackx
strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_1x
strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_2�
strided_sliceStridedSliceShape:output:0strided_slice/stack:output:0strided_slice/stack_1:output:0strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slicex
strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack|
strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_1|
strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_2�
strided_slice_1StridedSliceShape:output:0strided_slice_1/stack:output:0 strided_slice_1/stack_1:output:0 strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_1x
strided_slice_2/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack|
strided_slice_2/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_1|
strided_slice_2/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_2�
strided_slice_2StridedSliceShape:output:0strided_slice_2/stack:output:0 strided_slice_2/stack_1:output:0 strided_slice_2/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_2P
mul/yConst*
_output_shapes
: *
dtype0*
value	B :2
mul/y\
mulMulstrided_slice_1:output:0mul/y:output:0*
T0*
_output_shapes
: 2
mulT
mul_1/yConst*
_output_shapes
: *
dtype0*
value	B :2	
mul_1/yb
mul_1Mulstrided_slice_2:output:0mul_1/y:output:0*
T0*
_output_shapes
: 2
mul_1T
stack/3Const*
_output_shapes
: *
dtype0*
value	B :2	
stack/3�
stackPackstrided_slice:output:0mul:z:0	mul_1:z:0stack/3:output:0*
N*
T0*
_output_shapes
:2
stackx
strided_slice_3/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice_3/stack|
strided_slice_3/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_1|
strided_slice_3/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_2�
strided_slice_3StridedSlicestack:output:0strided_slice_3/stack:output:0 strided_slice_3/stack_1:output:0 strided_slice_3/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_3�
conv2d_transpose/ReadVariableOpReadVariableOp(conv2d_transpose_readvariableop_resource*&
_output_shapes
: *
dtype02!
conv2d_transpose/ReadVariableOp�
conv2d_transposeConv2DBackpropInputstack:output:0'conv2d_transpose/ReadVariableOp:value:0inputs*
T0*A
_output_shapes/
-:+���������������������������*
paddingSAME*
strides
2
conv2d_transpose�
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes
:*
dtype02
BiasAdd/ReadVariableOp�
BiasAddBiasAddconv2d_transpose:output:0BiasAdd/ReadVariableOp:value:0*
T0*A
_output_shapes/
-:+���������������������������2	
BiasAdd�
IdentityIdentityBiasAdd:output:0^BiasAdd/ReadVariableOp ^conv2d_transpose/ReadVariableOp*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+��������������������������� : : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp2B
conv2d_transpose/ReadVariableOpconv2d_transpose/ReadVariableOp:i e
A
_output_shapes/
-:+��������������������������� 
 
_user_specified_nameinputs
�
e
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_222795

inputs
identity~
	LeakyRelu	LeakyReluinputs*A
_output_shapes/
-:+��������������������������� *
alpha%���>2
	LeakyRelu�
IdentityIdentityLeakyRelu:activations:0*
T0*A
_output_shapes/
-:+��������������������������� 2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+��������������������������� :i e
A
_output_shapes/
-:+��������������������������� 
 
_user_specified_nameinputs
�
e
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_222771

inputs
identity~
	LeakyRelu	LeakyReluinputs*A
_output_shapes/
-:+���������������������������@*
alpha%���>2
	LeakyRelu�
IdentityIdentityLeakyRelu:activations:0*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������@:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�0
�
C__inference_decoder_layer_call_and_return_conditional_losses_223050
decoder_input 
dense_223019:

��
dense_223021:
��1
decoder_conv_t_0_223025:@@%
decoder_conv_t_0_223027:@1
decoder_conv_t_1_223031:@@%
decoder_conv_t_1_223033:@1
decoder_conv_t_2_223037: @%
decoder_conv_t_2_223039: 1
decoder_conv_t_3_223043: %
decoder_conv_t_3_223045:
identity��(decoder_conv_t_0/StatefulPartitionedCall�(decoder_conv_t_1/StatefulPartitionedCall�(decoder_conv_t_2/StatefulPartitionedCall�(decoder_conv_t_3/StatefulPartitionedCall�dense/StatefulPartitionedCall�
dense/StatefulPartitionedCallStatefulPartitionedCalldecoder_inputdense_223019dense_223021*
Tin
2*
Tout
2*
_collective_manager_ids
 *)
_output_shapes
:�����������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *J
fERC
A__inference_dense_layer_call_and_return_conditional_losses_2227392
dense/StatefulPartitionedCall�
reshape/PartitionedCallPartitionedCall&dense/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 */
_output_shapes
:���������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_reshape_layer_call_and_return_conditional_losses_2227592
reshape/PartitionedCall�
(decoder_conv_t_0/StatefulPartitionedCallStatefulPartitionedCall reshape/PartitionedCall:output:0decoder_conv_t_0_223025decoder_conv_t_0_223027*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_2225802*
(decoder_conv_t_0/StatefulPartitionedCall�
leaky_re_lu_4/PartitionedCallPartitionedCall1decoder_conv_t_0/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_2227712
leaky_re_lu_4/PartitionedCall�
(decoder_conv_t_1/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_4/PartitionedCall:output:0decoder_conv_t_1_223031decoder_conv_t_1_223033*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_2226242*
(decoder_conv_t_1/StatefulPartitionedCall�
leaky_re_lu_5/PartitionedCallPartitionedCall1decoder_conv_t_1/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_2227832
leaky_re_lu_5/PartitionedCall�
(decoder_conv_t_2/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_5/PartitionedCall:output:0decoder_conv_t_2_223037decoder_conv_t_2_223039*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� *$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_2226682*
(decoder_conv_t_2/StatefulPartitionedCall�
leaky_re_lu_6/PartitionedCallPartitionedCall1decoder_conv_t_2/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� * 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_2227952
leaky_re_lu_6/PartitionedCall�
(decoder_conv_t_3/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_6/PartitionedCall:output:0decoder_conv_t_3_223043decoder_conv_t_3_223045*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_2227122*
(decoder_conv_t_3/StatefulPartitionedCall�
activation/PartitionedCallPartitionedCall1decoder_conv_t_3/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *O
fJRH
F__inference_activation_layer_call_and_return_conditional_losses_2228072
activation/PartitionedCall�
IdentityIdentity#activation/PartitionedCall:output:0)^decoder_conv_t_0/StatefulPartitionedCall)^decoder_conv_t_1/StatefulPartitionedCall)^decoder_conv_t_2/StatefulPartitionedCall)^decoder_conv_t_3/StatefulPartitionedCall^dense/StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 2T
(decoder_conv_t_0/StatefulPartitionedCall(decoder_conv_t_0/StatefulPartitionedCall2T
(decoder_conv_t_1/StatefulPartitionedCall(decoder_conv_t_1/StatefulPartitionedCall2T
(decoder_conv_t_2/StatefulPartitionedCall(decoder_conv_t_2/StatefulPartitionedCall2T
(decoder_conv_t_3/StatefulPartitionedCall(decoder_conv_t_3/StatefulPartitionedCall2>
dense/StatefulPartitionedCalldense/StatefulPartitionedCall:V R
'
_output_shapes
:���������

'
_user_specified_namedecoder_input
�$
�
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_222668

inputsB
(conv2d_transpose_readvariableop_resource: @-
biasadd_readvariableop_resource: 
identity��BiasAdd/ReadVariableOp�conv2d_transpose/ReadVariableOpD
ShapeShapeinputs*
T0*
_output_shapes
:2
Shapet
strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice/stackx
strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_1x
strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_2�
strided_sliceStridedSliceShape:output:0strided_slice/stack:output:0strided_slice/stack_1:output:0strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slicex
strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack|
strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_1|
strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_2�
strided_slice_1StridedSliceShape:output:0strided_slice_1/stack:output:0 strided_slice_1/stack_1:output:0 strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_1x
strided_slice_2/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack|
strided_slice_2/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_1|
strided_slice_2/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_2�
strided_slice_2StridedSliceShape:output:0strided_slice_2/stack:output:0 strided_slice_2/stack_1:output:0 strided_slice_2/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_2P
mul/yConst*
_output_shapes
: *
dtype0*
value	B :2
mul/y\
mulMulstrided_slice_1:output:0mul/y:output:0*
T0*
_output_shapes
: 2
mulT
mul_1/yConst*
_output_shapes
: *
dtype0*
value	B :2	
mul_1/yb
mul_1Mulstrided_slice_2:output:0mul_1/y:output:0*
T0*
_output_shapes
: 2
mul_1T
stack/3Const*
_output_shapes
: *
dtype0*
value	B : 2	
stack/3�
stackPackstrided_slice:output:0mul:z:0	mul_1:z:0stack/3:output:0*
N*
T0*
_output_shapes
:2
stackx
strided_slice_3/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice_3/stack|
strided_slice_3/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_1|
strided_slice_3/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_2�
strided_slice_3StridedSlicestack:output:0strided_slice_3/stack:output:0 strided_slice_3/stack_1:output:0 strided_slice_3/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_3�
conv2d_transpose/ReadVariableOpReadVariableOp(conv2d_transpose_readvariableop_resource*&
_output_shapes
: @*
dtype02!
conv2d_transpose/ReadVariableOp�
conv2d_transposeConv2DBackpropInputstack:output:0'conv2d_transpose/ReadVariableOp:value:0inputs*
T0*A
_output_shapes/
-:+��������������������������� *
paddingSAME*
strides
2
conv2d_transpose�
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes
: *
dtype02
BiasAdd/ReadVariableOp�
BiasAddBiasAddconv2d_transpose:output:0BiasAdd/ReadVariableOp:value:0*
T0*A
_output_shapes/
-:+��������������������������� 2	
BiasAdd�
IdentityIdentityBiasAdd:output:0^BiasAdd/ReadVariableOp ^conv2d_transpose/ReadVariableOp*
T0*A
_output_shapes/
-:+��������������������������� 2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+���������������������������@: : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp2B
conv2d_transpose/ReadVariableOpconv2d_transpose/ReadVariableOp:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�$
�
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_222580

inputsB
(conv2d_transpose_readvariableop_resource:@@-
biasadd_readvariableop_resource:@
identity��BiasAdd/ReadVariableOp�conv2d_transpose/ReadVariableOpD
ShapeShapeinputs*
T0*
_output_shapes
:2
Shapet
strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice/stackx
strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_1x
strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_2�
strided_sliceStridedSliceShape:output:0strided_slice/stack:output:0strided_slice/stack_1:output:0strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slicex
strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack|
strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_1|
strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_2�
strided_slice_1StridedSliceShape:output:0strided_slice_1/stack:output:0 strided_slice_1/stack_1:output:0 strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_1x
strided_slice_2/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack|
strided_slice_2/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_1|
strided_slice_2/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_2�
strided_slice_2StridedSliceShape:output:0strided_slice_2/stack:output:0 strided_slice_2/stack_1:output:0 strided_slice_2/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_2P
mul/yConst*
_output_shapes
: *
dtype0*
value	B :2
mul/y\
mulMulstrided_slice_1:output:0mul/y:output:0*
T0*
_output_shapes
: 2
mulT
mul_1/yConst*
_output_shapes
: *
dtype0*
value	B :2	
mul_1/yb
mul_1Mulstrided_slice_2:output:0mul_1/y:output:0*
T0*
_output_shapes
: 2
mul_1T
stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2	
stack/3�
stackPackstrided_slice:output:0mul:z:0	mul_1:z:0stack/3:output:0*
N*
T0*
_output_shapes
:2
stackx
strided_slice_3/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice_3/stack|
strided_slice_3/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_1|
strided_slice_3/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_2�
strided_slice_3StridedSlicestack:output:0strided_slice_3/stack:output:0 strided_slice_3/stack_1:output:0 strided_slice_3/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_3�
conv2d_transpose/ReadVariableOpReadVariableOp(conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype02!
conv2d_transpose/ReadVariableOp�
conv2d_transposeConv2DBackpropInputstack:output:0'conv2d_transpose/ReadVariableOp:value:0inputs*
T0*A
_output_shapes/
-:+���������������������������@*
paddingSAME*
strides
2
conv2d_transpose�
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes
:@*
dtype02
BiasAdd/ReadVariableOp�
BiasAddBiasAddconv2d_transpose:output:0BiasAdd/ReadVariableOp:value:0*
T0*A
_output_shapes/
-:+���������������������������@2	
BiasAdd�
IdentityIdentityBiasAdd:output:0^BiasAdd/ReadVariableOp ^conv2d_transpose/ReadVariableOp*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+���������������������������@: : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp2B
conv2d_transpose/ReadVariableOpconv2d_transpose/ReadVariableOp:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
J
.__inference_leaky_re_lu_6_layer_call_fn_223395

inputs
identity�
PartitionedCallPartitionedCallinputs*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� * 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_2227952
PartitionedCall�
IdentityIdentityPartitionedCall:output:0*
T0*A
_output_shapes/
-:+��������������������������� 2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+��������������������������� :i e
A
_output_shapes/
-:+��������������������������� 
 
_user_specified_nameinputs
�$
�
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_222624

inputsB
(conv2d_transpose_readvariableop_resource:@@-
biasadd_readvariableop_resource:@
identity��BiasAdd/ReadVariableOp�conv2d_transpose/ReadVariableOpD
ShapeShapeinputs*
T0*
_output_shapes
:2
Shapet
strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice/stackx
strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_1x
strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_2�
strided_sliceStridedSliceShape:output:0strided_slice/stack:output:0strided_slice/stack_1:output:0strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slicex
strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack|
strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_1|
strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_1/stack_2�
strided_slice_1StridedSliceShape:output:0strided_slice_1/stack:output:0 strided_slice_1/stack_1:output:0 strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_1x
strided_slice_2/stackConst*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack|
strided_slice_2/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_1|
strided_slice_2/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_2/stack_2�
strided_slice_2StridedSliceShape:output:0strided_slice_2/stack:output:0 strided_slice_2/stack_1:output:0 strided_slice_2/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_2P
mul/yConst*
_output_shapes
: *
dtype0*
value	B :2
mul/y\
mulMulstrided_slice_1:output:0mul/y:output:0*
T0*
_output_shapes
: 2
mulT
mul_1/yConst*
_output_shapes
: *
dtype0*
value	B :2	
mul_1/yb
mul_1Mulstrided_slice_2:output:0mul_1/y:output:0*
T0*
_output_shapes
: 2
mul_1T
stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2	
stack/3�
stackPackstrided_slice:output:0mul:z:0	mul_1:z:0stack/3:output:0*
N*
T0*
_output_shapes
:2
stackx
strided_slice_3/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice_3/stack|
strided_slice_3/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_1|
strided_slice_3/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice_3/stack_2�
strided_slice_3StridedSlicestack:output:0strided_slice_3/stack:output:0 strided_slice_3/stack_1:output:0 strided_slice_3/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_slice_3�
conv2d_transpose/ReadVariableOpReadVariableOp(conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype02!
conv2d_transpose/ReadVariableOp�
conv2d_transposeConv2DBackpropInputstack:output:0'conv2d_transpose/ReadVariableOp:value:0inputs*
T0*A
_output_shapes/
-:+���������������������������@*
paddingSAME*
strides
2
conv2d_transpose�
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes
:@*
dtype02
BiasAdd/ReadVariableOp�
BiasAddBiasAddconv2d_transpose:output:0BiasAdd/ReadVariableOp:value:0*
T0*A
_output_shapes/
-:+���������������������������@2	
BiasAdd�
IdentityIdentityBiasAdd:output:0^BiasAdd/ReadVariableOp ^conv2d_transpose/ReadVariableOp*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+���������������������������@: : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp2B
conv2d_transpose/ReadVariableOpconv2d_transpose/ReadVariableOp:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
_
C__inference_reshape_layer_call_and_return_conditional_losses_223360

inputs
identityD
ShapeShapeinputs*
T0*
_output_shapes
:2
Shapet
strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice/stackx
strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_1x
strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_2�
strided_sliceStridedSliceShape:output:0strided_slice/stack:output:0strided_slice/stack_1:output:0strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_sliced
Reshape/shape/1Const*
_output_shapes
: *
dtype0*
value	B :2
Reshape/shape/1d
Reshape/shape/2Const*
_output_shapes
: *
dtype0*
value	B :2
Reshape/shape/2d
Reshape/shape/3Const*
_output_shapes
: *
dtype0*
value	B :@2
Reshape/shape/3�
Reshape/shapePackstrided_slice:output:0Reshape/shape/1:output:0Reshape/shape/2:output:0Reshape/shape/3:output:0*
N*
T0*
_output_shapes
:2
Reshape/shapew
ReshapeReshapeinputsReshape/shape:output:0*
T0*/
_output_shapes
:���������@2	
Reshapel
IdentityIdentityReshape:output:0*
T0*/
_output_shapes
:���������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*(
_input_shapes
:�����������:Q M
)
_output_shapes
:�����������
 
_user_specified_nameinputs
�0
�
C__inference_decoder_layer_call_and_return_conditional_losses_222934

inputs 
dense_222903:

��
dense_222905:
��1
decoder_conv_t_0_222909:@@%
decoder_conv_t_0_222911:@1
decoder_conv_t_1_222915:@@%
decoder_conv_t_1_222917:@1
decoder_conv_t_2_222921: @%
decoder_conv_t_2_222923: 1
decoder_conv_t_3_222927: %
decoder_conv_t_3_222929:
identity��(decoder_conv_t_0/StatefulPartitionedCall�(decoder_conv_t_1/StatefulPartitionedCall�(decoder_conv_t_2/StatefulPartitionedCall�(decoder_conv_t_3/StatefulPartitionedCall�dense/StatefulPartitionedCall�
dense/StatefulPartitionedCallStatefulPartitionedCallinputsdense_222903dense_222905*
Tin
2*
Tout
2*
_collective_manager_ids
 *)
_output_shapes
:�����������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *J
fERC
A__inference_dense_layer_call_and_return_conditional_losses_2227392
dense/StatefulPartitionedCall�
reshape/PartitionedCallPartitionedCall&dense/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 */
_output_shapes
:���������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_reshape_layer_call_and_return_conditional_losses_2227592
reshape/PartitionedCall�
(decoder_conv_t_0/StatefulPartitionedCallStatefulPartitionedCall reshape/PartitionedCall:output:0decoder_conv_t_0_222909decoder_conv_t_0_222911*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_2225802*
(decoder_conv_t_0/StatefulPartitionedCall�
leaky_re_lu_4/PartitionedCallPartitionedCall1decoder_conv_t_0/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_2227712
leaky_re_lu_4/PartitionedCall�
(decoder_conv_t_1/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_4/PartitionedCall:output:0decoder_conv_t_1_222915decoder_conv_t_1_222917*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_2226242*
(decoder_conv_t_1/StatefulPartitionedCall�
leaky_re_lu_5/PartitionedCallPartitionedCall1decoder_conv_t_1/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_2227832
leaky_re_lu_5/PartitionedCall�
(decoder_conv_t_2/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_5/PartitionedCall:output:0decoder_conv_t_2_222921decoder_conv_t_2_222923*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� *$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_2226682*
(decoder_conv_t_2/StatefulPartitionedCall�
leaky_re_lu_6/PartitionedCallPartitionedCall1decoder_conv_t_2/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� * 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_2227952
leaky_re_lu_6/PartitionedCall�
(decoder_conv_t_3/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_6/PartitionedCall:output:0decoder_conv_t_3_222927decoder_conv_t_3_222929*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_2227122*
(decoder_conv_t_3/StatefulPartitionedCall�
activation/PartitionedCallPartitionedCall1decoder_conv_t_3/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *O
fJRH
F__inference_activation_layer_call_and_return_conditional_losses_2228072
activation/PartitionedCall�
IdentityIdentity#activation/PartitionedCall:output:0)^decoder_conv_t_0/StatefulPartitionedCall)^decoder_conv_t_1/StatefulPartitionedCall)^decoder_conv_t_2/StatefulPartitionedCall)^decoder_conv_t_3/StatefulPartitionedCall^dense/StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 2T
(decoder_conv_t_0/StatefulPartitionedCall(decoder_conv_t_0/StatefulPartitionedCall2T
(decoder_conv_t_1/StatefulPartitionedCall(decoder_conv_t_1/StatefulPartitionedCall2T
(decoder_conv_t_2/StatefulPartitionedCall(decoder_conv_t_2/StatefulPartitionedCall2T
(decoder_conv_t_3/StatefulPartitionedCall(decoder_conv_t_3/StatefulPartitionedCall2>
dense/StatefulPartitionedCalldense/StatefulPartitionedCall:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�/
�
"__inference__traced_restore_223498
file_prefix1
assignvariableop_dense_kernel:

��-
assignvariableop_1_dense_bias:
��D
*assignvariableop_2_decoder_conv_t_0_kernel:@@6
(assignvariableop_3_decoder_conv_t_0_bias:@D
*assignvariableop_4_decoder_conv_t_1_kernel:@@6
(assignvariableop_5_decoder_conv_t_1_bias:@D
*assignvariableop_6_decoder_conv_t_2_kernel: @6
(assignvariableop_7_decoder_conv_t_2_bias: D
*assignvariableop_8_decoder_conv_t_3_kernel: 6
(assignvariableop_9_decoder_conv_t_3_bias:
identity_11��AssignVariableOp�AssignVariableOp_1�AssignVariableOp_2�AssignVariableOp_3�AssignVariableOp_4�AssignVariableOp_5�AssignVariableOp_6�AssignVariableOp_7�AssignVariableOp_8�AssignVariableOp_9�
RestoreV2/tensor_namesConst"/device:CPU:0*
_output_shapes
:*
dtype0*�
value�B�B6layer_with_weights-0/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-0/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-1/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-1/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-2/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-2/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-3/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-3/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-4/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-4/bias/.ATTRIBUTES/VARIABLE_VALUEB_CHECKPOINTABLE_OBJECT_GRAPH2
RestoreV2/tensor_names�
RestoreV2/shape_and_slicesConst"/device:CPU:0*
_output_shapes
:*
dtype0*)
value BB B B B B B B B B B B 2
RestoreV2/shape_and_slices�
	RestoreV2	RestoreV2file_prefixRestoreV2/tensor_names:output:0#RestoreV2/shape_and_slices:output:0"/device:CPU:0*@
_output_shapes.
,:::::::::::*
dtypes
22
	RestoreV2g
IdentityIdentityRestoreV2:tensors:0"/device:CPU:0*
T0*
_output_shapes
:2

Identity�
AssignVariableOpAssignVariableOpassignvariableop_dense_kernelIdentity:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOpk

Identity_1IdentityRestoreV2:tensors:1"/device:CPU:0*
T0*
_output_shapes
:2

Identity_1�
AssignVariableOp_1AssignVariableOpassignvariableop_1_dense_biasIdentity_1:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_1k

Identity_2IdentityRestoreV2:tensors:2"/device:CPU:0*
T0*
_output_shapes
:2

Identity_2�
AssignVariableOp_2AssignVariableOp*assignvariableop_2_decoder_conv_t_0_kernelIdentity_2:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_2k

Identity_3IdentityRestoreV2:tensors:3"/device:CPU:0*
T0*
_output_shapes
:2

Identity_3�
AssignVariableOp_3AssignVariableOp(assignvariableop_3_decoder_conv_t_0_biasIdentity_3:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_3k

Identity_4IdentityRestoreV2:tensors:4"/device:CPU:0*
T0*
_output_shapes
:2

Identity_4�
AssignVariableOp_4AssignVariableOp*assignvariableop_4_decoder_conv_t_1_kernelIdentity_4:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_4k

Identity_5IdentityRestoreV2:tensors:5"/device:CPU:0*
T0*
_output_shapes
:2

Identity_5�
AssignVariableOp_5AssignVariableOp(assignvariableop_5_decoder_conv_t_1_biasIdentity_5:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_5k

Identity_6IdentityRestoreV2:tensors:6"/device:CPU:0*
T0*
_output_shapes
:2

Identity_6�
AssignVariableOp_6AssignVariableOp*assignvariableop_6_decoder_conv_t_2_kernelIdentity_6:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_6k

Identity_7IdentityRestoreV2:tensors:7"/device:CPU:0*
T0*
_output_shapes
:2

Identity_7�
AssignVariableOp_7AssignVariableOp(assignvariableop_7_decoder_conv_t_2_biasIdentity_7:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_7k

Identity_8IdentityRestoreV2:tensors:8"/device:CPU:0*
T0*
_output_shapes
:2

Identity_8�
AssignVariableOp_8AssignVariableOp*assignvariableop_8_decoder_conv_t_3_kernelIdentity_8:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_8k

Identity_9IdentityRestoreV2:tensors:9"/device:CPU:0*
T0*
_output_shapes
:2

Identity_9�
AssignVariableOp_9AssignVariableOp(assignvariableop_9_decoder_conv_t_3_biasIdentity_9:output:0"/device:CPU:0*
_output_shapes
 *
dtype02
AssignVariableOp_99
NoOpNoOp"/device:CPU:0*
_output_shapes
 2
NoOp�
Identity_10Identityfile_prefix^AssignVariableOp^AssignVariableOp_1^AssignVariableOp_2^AssignVariableOp_3^AssignVariableOp_4^AssignVariableOp_5^AssignVariableOp_6^AssignVariableOp_7^AssignVariableOp_8^AssignVariableOp_9^NoOp"/device:CPU:0*
T0*
_output_shapes
: 2
Identity_10�
Identity_11IdentityIdentity_10:output:0^AssignVariableOp^AssignVariableOp_1^AssignVariableOp_2^AssignVariableOp_3^AssignVariableOp_4^AssignVariableOp_5^AssignVariableOp_6^AssignVariableOp_7^AssignVariableOp_8^AssignVariableOp_9*
T0*
_output_shapes
: 2
Identity_11"#
identity_11Identity_11:output:0*)
_input_shapes
: : : : : : : : : : : 2$
AssignVariableOpAssignVariableOp2(
AssignVariableOp_1AssignVariableOp_12(
AssignVariableOp_2AssignVariableOp_22(
AssignVariableOp_3AssignVariableOp_32(
AssignVariableOp_4AssignVariableOp_42(
AssignVariableOp_5AssignVariableOp_52(
AssignVariableOp_6AssignVariableOp_62(
AssignVariableOp_7AssignVariableOp_72(
AssignVariableOp_8AssignVariableOp_82(
AssignVariableOp_9AssignVariableOp_9:C ?

_output_shapes
: 
%
_user_specified_namefile_prefix
��
�	
C__inference_decoder_layer_call_and_return_conditional_losses_223277

inputs8
$dense_matmul_readvariableop_resource:

��5
%dense_biasadd_readvariableop_resource:
��S
9decoder_conv_t_0_conv2d_transpose_readvariableop_resource:@@>
0decoder_conv_t_0_biasadd_readvariableop_resource:@S
9decoder_conv_t_1_conv2d_transpose_readvariableop_resource:@@>
0decoder_conv_t_1_biasadd_readvariableop_resource:@S
9decoder_conv_t_2_conv2d_transpose_readvariableop_resource: @>
0decoder_conv_t_2_biasadd_readvariableop_resource: S
9decoder_conv_t_3_conv2d_transpose_readvariableop_resource: >
0decoder_conv_t_3_biasadd_readvariableop_resource:
identity��'decoder_conv_t_0/BiasAdd/ReadVariableOp�0decoder_conv_t_0/conv2d_transpose/ReadVariableOp�'decoder_conv_t_1/BiasAdd/ReadVariableOp�0decoder_conv_t_1/conv2d_transpose/ReadVariableOp�'decoder_conv_t_2/BiasAdd/ReadVariableOp�0decoder_conv_t_2/conv2d_transpose/ReadVariableOp�'decoder_conv_t_3/BiasAdd/ReadVariableOp�0decoder_conv_t_3/conv2d_transpose/ReadVariableOp�dense/BiasAdd/ReadVariableOp�dense/MatMul/ReadVariableOp�
dense/MatMul/ReadVariableOpReadVariableOp$dense_matmul_readvariableop_resource* 
_output_shapes
:

��*
dtype02
dense/MatMul/ReadVariableOp�
dense/MatMulMatMulinputs#dense/MatMul/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
dense/MatMul�
dense/BiasAdd/ReadVariableOpReadVariableOp%dense_biasadd_readvariableop_resource*
_output_shapes

:��*
dtype02
dense/BiasAdd/ReadVariableOp�
dense/BiasAddBiasAdddense/MatMul:product:0$dense/BiasAdd/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
dense/BiasAddd
reshape/ShapeShapedense/BiasAdd:output:0*
T0*
_output_shapes
:2
reshape/Shape�
reshape/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
reshape/strided_slice/stack�
reshape/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
reshape/strided_slice/stack_1�
reshape/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
reshape/strided_slice/stack_2�
reshape/strided_sliceStridedSlicereshape/Shape:output:0$reshape/strided_slice/stack:output:0&reshape/strided_slice/stack_1:output:0&reshape/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
reshape/strided_slicet
reshape/Reshape/shape/1Const*
_output_shapes
: *
dtype0*
value	B :2
reshape/Reshape/shape/1t
reshape/Reshape/shape/2Const*
_output_shapes
: *
dtype0*
value	B :2
reshape/Reshape/shape/2t
reshape/Reshape/shape/3Const*
_output_shapes
: *
dtype0*
value	B :@2
reshape/Reshape/shape/3�
reshape/Reshape/shapePackreshape/strided_slice:output:0 reshape/Reshape/shape/1:output:0 reshape/Reshape/shape/2:output:0 reshape/Reshape/shape/3:output:0*
N*
T0*
_output_shapes
:2
reshape/Reshape/shape�
reshape/ReshapeReshapedense/BiasAdd:output:0reshape/Reshape/shape:output:0*
T0*/
_output_shapes
:���������@2
reshape/Reshapex
decoder_conv_t_0/ShapeShapereshape/Reshape:output:0*
T0*
_output_shapes
:2
decoder_conv_t_0/Shape�
$decoder_conv_t_0/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_0/strided_slice/stack�
&decoder_conv_t_0/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_0/strided_slice/stack_1�
&decoder_conv_t_0/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_0/strided_slice/stack_2�
decoder_conv_t_0/strided_sliceStridedSlicedecoder_conv_t_0/Shape:output:0-decoder_conv_t_0/strided_slice/stack:output:0/decoder_conv_t_0/strided_slice/stack_1:output:0/decoder_conv_t_0/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_0/strided_slicev
decoder_conv_t_0/stack/1Const*
_output_shapes
: *
dtype0*
value	B :2
decoder_conv_t_0/stack/1v
decoder_conv_t_0/stack/2Const*
_output_shapes
: *
dtype0*
value	B :2
decoder_conv_t_0/stack/2v
decoder_conv_t_0/stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2
decoder_conv_t_0/stack/3�
decoder_conv_t_0/stackPack'decoder_conv_t_0/strided_slice:output:0!decoder_conv_t_0/stack/1:output:0!decoder_conv_t_0/stack/2:output:0!decoder_conv_t_0/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_0/stack�
&decoder_conv_t_0/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_0/strided_slice_1/stack�
(decoder_conv_t_0/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_0/strided_slice_1/stack_1�
(decoder_conv_t_0/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_0/strided_slice_1/stack_2�
 decoder_conv_t_0/strided_slice_1StridedSlicedecoder_conv_t_0/stack:output:0/decoder_conv_t_0/strided_slice_1/stack:output:01decoder_conv_t_0/strided_slice_1/stack_1:output:01decoder_conv_t_0/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_0/strided_slice_1�
0decoder_conv_t_0/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_0_conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype022
0decoder_conv_t_0/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_0/conv2d_transposeConv2DBackpropInputdecoder_conv_t_0/stack:output:08decoder_conv_t_0/conv2d_transpose/ReadVariableOp:value:0reshape/Reshape:output:0*
T0*/
_output_shapes
:���������@*
paddingSAME*
strides
2#
!decoder_conv_t_0/conv2d_transpose�
'decoder_conv_t_0/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_0_biasadd_readvariableop_resource*
_output_shapes
:@*
dtype02)
'decoder_conv_t_0/BiasAdd/ReadVariableOp�
decoder_conv_t_0/BiasAddBiasAdd*decoder_conv_t_0/conv2d_transpose:output:0/decoder_conv_t_0/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������@2
decoder_conv_t_0/BiasAdd�
leaky_re_lu_4/LeakyRelu	LeakyRelu!decoder_conv_t_0/BiasAdd:output:0*/
_output_shapes
:���������@*
alpha%���>2
leaky_re_lu_4/LeakyRelu�
decoder_conv_t_1/ShapeShape%leaky_re_lu_4/LeakyRelu:activations:0*
T0*
_output_shapes
:2
decoder_conv_t_1/Shape�
$decoder_conv_t_1/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_1/strided_slice/stack�
&decoder_conv_t_1/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_1/strided_slice/stack_1�
&decoder_conv_t_1/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_1/strided_slice/stack_2�
decoder_conv_t_1/strided_sliceStridedSlicedecoder_conv_t_1/Shape:output:0-decoder_conv_t_1/strided_slice/stack:output:0/decoder_conv_t_1/strided_slice/stack_1:output:0/decoder_conv_t_1/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_1/strided_slicev
decoder_conv_t_1/stack/1Const*
_output_shapes
: *
dtype0*
value	B :22
decoder_conv_t_1/stack/1v
decoder_conv_t_1/stack/2Const*
_output_shapes
: *
dtype0*
value	B :22
decoder_conv_t_1/stack/2v
decoder_conv_t_1/stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2
decoder_conv_t_1/stack/3�
decoder_conv_t_1/stackPack'decoder_conv_t_1/strided_slice:output:0!decoder_conv_t_1/stack/1:output:0!decoder_conv_t_1/stack/2:output:0!decoder_conv_t_1/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_1/stack�
&decoder_conv_t_1/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_1/strided_slice_1/stack�
(decoder_conv_t_1/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_1/strided_slice_1/stack_1�
(decoder_conv_t_1/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_1/strided_slice_1/stack_2�
 decoder_conv_t_1/strided_slice_1StridedSlicedecoder_conv_t_1/stack:output:0/decoder_conv_t_1/strided_slice_1/stack:output:01decoder_conv_t_1/strided_slice_1/stack_1:output:01decoder_conv_t_1/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_1/strided_slice_1�
0decoder_conv_t_1/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_1_conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype022
0decoder_conv_t_1/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_1/conv2d_transposeConv2DBackpropInputdecoder_conv_t_1/stack:output:08decoder_conv_t_1/conv2d_transpose/ReadVariableOp:value:0%leaky_re_lu_4/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������22@*
paddingSAME*
strides
2#
!decoder_conv_t_1/conv2d_transpose�
'decoder_conv_t_1/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_1_biasadd_readvariableop_resource*
_output_shapes
:@*
dtype02)
'decoder_conv_t_1/BiasAdd/ReadVariableOp�
decoder_conv_t_1/BiasAddBiasAdd*decoder_conv_t_1/conv2d_transpose:output:0/decoder_conv_t_1/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������22@2
decoder_conv_t_1/BiasAdd�
leaky_re_lu_5/LeakyRelu	LeakyRelu!decoder_conv_t_1/BiasAdd:output:0*/
_output_shapes
:���������22@*
alpha%���>2
leaky_re_lu_5/LeakyRelu�
decoder_conv_t_2/ShapeShape%leaky_re_lu_5/LeakyRelu:activations:0*
T0*
_output_shapes
:2
decoder_conv_t_2/Shape�
$decoder_conv_t_2/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_2/strided_slice/stack�
&decoder_conv_t_2/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_2/strided_slice/stack_1�
&decoder_conv_t_2/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_2/strided_slice/stack_2�
decoder_conv_t_2/strided_sliceStridedSlicedecoder_conv_t_2/Shape:output:0-decoder_conv_t_2/strided_slice/stack:output:0/decoder_conv_t_2/strided_slice/stack_1:output:0/decoder_conv_t_2/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_2/strided_slicev
decoder_conv_t_2/stack/1Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_2/stack/1v
decoder_conv_t_2/stack/2Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_2/stack/2v
decoder_conv_t_2/stack/3Const*
_output_shapes
: *
dtype0*
value	B : 2
decoder_conv_t_2/stack/3�
decoder_conv_t_2/stackPack'decoder_conv_t_2/strided_slice:output:0!decoder_conv_t_2/stack/1:output:0!decoder_conv_t_2/stack/2:output:0!decoder_conv_t_2/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_2/stack�
&decoder_conv_t_2/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_2/strided_slice_1/stack�
(decoder_conv_t_2/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_2/strided_slice_1/stack_1�
(decoder_conv_t_2/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_2/strided_slice_1/stack_2�
 decoder_conv_t_2/strided_slice_1StridedSlicedecoder_conv_t_2/stack:output:0/decoder_conv_t_2/strided_slice_1/stack:output:01decoder_conv_t_2/strided_slice_1/stack_1:output:01decoder_conv_t_2/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_2/strided_slice_1�
0decoder_conv_t_2/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_2_conv2d_transpose_readvariableop_resource*&
_output_shapes
: @*
dtype022
0decoder_conv_t_2/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_2/conv2d_transposeConv2DBackpropInputdecoder_conv_t_2/stack:output:08decoder_conv_t_2/conv2d_transpose/ReadVariableOp:value:0%leaky_re_lu_5/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������dd *
paddingSAME*
strides
2#
!decoder_conv_t_2/conv2d_transpose�
'decoder_conv_t_2/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_2_biasadd_readvariableop_resource*
_output_shapes
: *
dtype02)
'decoder_conv_t_2/BiasAdd/ReadVariableOp�
decoder_conv_t_2/BiasAddBiasAdd*decoder_conv_t_2/conv2d_transpose:output:0/decoder_conv_t_2/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������dd 2
decoder_conv_t_2/BiasAdd�
leaky_re_lu_6/LeakyRelu	LeakyRelu!decoder_conv_t_2/BiasAdd:output:0*/
_output_shapes
:���������dd *
alpha%���>2
leaky_re_lu_6/LeakyRelu�
decoder_conv_t_3/ShapeShape%leaky_re_lu_6/LeakyRelu:activations:0*
T0*
_output_shapes
:2
decoder_conv_t_3/Shape�
$decoder_conv_t_3/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_3/strided_slice/stack�
&decoder_conv_t_3/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_3/strided_slice/stack_1�
&decoder_conv_t_3/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_3/strided_slice/stack_2�
decoder_conv_t_3/strided_sliceStridedSlicedecoder_conv_t_3/Shape:output:0-decoder_conv_t_3/strided_slice/stack:output:0/decoder_conv_t_3/strided_slice/stack_1:output:0/decoder_conv_t_3/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_3/strided_slicev
decoder_conv_t_3/stack/1Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_3/stack/1v
decoder_conv_t_3/stack/2Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_3/stack/2v
decoder_conv_t_3/stack/3Const*
_output_shapes
: *
dtype0*
value	B :2
decoder_conv_t_3/stack/3�
decoder_conv_t_3/stackPack'decoder_conv_t_3/strided_slice:output:0!decoder_conv_t_3/stack/1:output:0!decoder_conv_t_3/stack/2:output:0!decoder_conv_t_3/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_3/stack�
&decoder_conv_t_3/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_3/strided_slice_1/stack�
(decoder_conv_t_3/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_3/strided_slice_1/stack_1�
(decoder_conv_t_3/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_3/strided_slice_1/stack_2�
 decoder_conv_t_3/strided_slice_1StridedSlicedecoder_conv_t_3/stack:output:0/decoder_conv_t_3/strided_slice_1/stack:output:01decoder_conv_t_3/strided_slice_1/stack_1:output:01decoder_conv_t_3/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_3/strided_slice_1�
0decoder_conv_t_3/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_3_conv2d_transpose_readvariableop_resource*&
_output_shapes
: *
dtype022
0decoder_conv_t_3/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_3/conv2d_transposeConv2DBackpropInputdecoder_conv_t_3/stack:output:08decoder_conv_t_3/conv2d_transpose/ReadVariableOp:value:0%leaky_re_lu_6/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������dd*
paddingSAME*
strides
2#
!decoder_conv_t_3/conv2d_transpose�
'decoder_conv_t_3/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_3_biasadd_readvariableop_resource*
_output_shapes
:*
dtype02)
'decoder_conv_t_3/BiasAdd/ReadVariableOp�
decoder_conv_t_3/BiasAddBiasAdd*decoder_conv_t_3/conv2d_transpose:output:0/decoder_conv_t_3/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������dd2
decoder_conv_t_3/BiasAdd�
activation/SigmoidSigmoid!decoder_conv_t_3/BiasAdd:output:0*
T0*/
_output_shapes
:���������dd2
activation/Sigmoid�
IdentityIdentityactivation/Sigmoid:y:0(^decoder_conv_t_0/BiasAdd/ReadVariableOp1^decoder_conv_t_0/conv2d_transpose/ReadVariableOp(^decoder_conv_t_1/BiasAdd/ReadVariableOp1^decoder_conv_t_1/conv2d_transpose/ReadVariableOp(^decoder_conv_t_2/BiasAdd/ReadVariableOp1^decoder_conv_t_2/conv2d_transpose/ReadVariableOp(^decoder_conv_t_3/BiasAdd/ReadVariableOp1^decoder_conv_t_3/conv2d_transpose/ReadVariableOp^dense/BiasAdd/ReadVariableOp^dense/MatMul/ReadVariableOp*
T0*/
_output_shapes
:���������dd2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 2R
'decoder_conv_t_0/BiasAdd/ReadVariableOp'decoder_conv_t_0/BiasAdd/ReadVariableOp2d
0decoder_conv_t_0/conv2d_transpose/ReadVariableOp0decoder_conv_t_0/conv2d_transpose/ReadVariableOp2R
'decoder_conv_t_1/BiasAdd/ReadVariableOp'decoder_conv_t_1/BiasAdd/ReadVariableOp2d
0decoder_conv_t_1/conv2d_transpose/ReadVariableOp0decoder_conv_t_1/conv2d_transpose/ReadVariableOp2R
'decoder_conv_t_2/BiasAdd/ReadVariableOp'decoder_conv_t_2/BiasAdd/ReadVariableOp2d
0decoder_conv_t_2/conv2d_transpose/ReadVariableOp0decoder_conv_t_2/conv2d_transpose/ReadVariableOp2R
'decoder_conv_t_3/BiasAdd/ReadVariableOp'decoder_conv_t_3/BiasAdd/ReadVariableOp2d
0decoder_conv_t_3/conv2d_transpose/ReadVariableOp0decoder_conv_t_3/conv2d_transpose/ReadVariableOp2<
dense/BiasAdd/ReadVariableOpdense/BiasAdd/ReadVariableOp2:
dense/MatMul/ReadVariableOpdense/MatMul/ReadVariableOp:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�0
�
C__inference_decoder_layer_call_and_return_conditional_losses_223016
decoder_input 
dense_222985:

��
dense_222987:
��1
decoder_conv_t_0_222991:@@%
decoder_conv_t_0_222993:@1
decoder_conv_t_1_222997:@@%
decoder_conv_t_1_222999:@1
decoder_conv_t_2_223003: @%
decoder_conv_t_2_223005: 1
decoder_conv_t_3_223009: %
decoder_conv_t_3_223011:
identity��(decoder_conv_t_0/StatefulPartitionedCall�(decoder_conv_t_1/StatefulPartitionedCall�(decoder_conv_t_2/StatefulPartitionedCall�(decoder_conv_t_3/StatefulPartitionedCall�dense/StatefulPartitionedCall�
dense/StatefulPartitionedCallStatefulPartitionedCalldecoder_inputdense_222985dense_222987*
Tin
2*
Tout
2*
_collective_manager_ids
 *)
_output_shapes
:�����������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *J
fERC
A__inference_dense_layer_call_and_return_conditional_losses_2227392
dense/StatefulPartitionedCall�
reshape/PartitionedCallPartitionedCall&dense/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 */
_output_shapes
:���������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_reshape_layer_call_and_return_conditional_losses_2227592
reshape/PartitionedCall�
(decoder_conv_t_0/StatefulPartitionedCallStatefulPartitionedCall reshape/PartitionedCall:output:0decoder_conv_t_0_222991decoder_conv_t_0_222993*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_2225802*
(decoder_conv_t_0/StatefulPartitionedCall�
leaky_re_lu_4/PartitionedCallPartitionedCall1decoder_conv_t_0/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_2227712
leaky_re_lu_4/PartitionedCall�
(decoder_conv_t_1/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_4/PartitionedCall:output:0decoder_conv_t_1_222997decoder_conv_t_1_222999*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_2226242*
(decoder_conv_t_1/StatefulPartitionedCall�
leaky_re_lu_5/PartitionedCallPartitionedCall1decoder_conv_t_1/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_2227832
leaky_re_lu_5/PartitionedCall�
(decoder_conv_t_2/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_5/PartitionedCall:output:0decoder_conv_t_2_223003decoder_conv_t_2_223005*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� *$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_2226682*
(decoder_conv_t_2/StatefulPartitionedCall�
leaky_re_lu_6/PartitionedCallPartitionedCall1decoder_conv_t_2/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� * 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_2227952
leaky_re_lu_6/PartitionedCall�
(decoder_conv_t_3/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_6/PartitionedCall:output:0decoder_conv_t_3_223009decoder_conv_t_3_223011*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_2227122*
(decoder_conv_t_3/StatefulPartitionedCall�
activation/PartitionedCallPartitionedCall1decoder_conv_t_3/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *O
fJRH
F__inference_activation_layer_call_and_return_conditional_losses_2228072
activation/PartitionedCall�
IdentityIdentity#activation/PartitionedCall:output:0)^decoder_conv_t_0/StatefulPartitionedCall)^decoder_conv_t_1/StatefulPartitionedCall)^decoder_conv_t_2/StatefulPartitionedCall)^decoder_conv_t_3/StatefulPartitionedCall^dense/StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 2T
(decoder_conv_t_0/StatefulPartitionedCall(decoder_conv_t_0/StatefulPartitionedCall2T
(decoder_conv_t_1/StatefulPartitionedCall(decoder_conv_t_1/StatefulPartitionedCall2T
(decoder_conv_t_2/StatefulPartitionedCall(decoder_conv_t_2/StatefulPartitionedCall2T
(decoder_conv_t_3/StatefulPartitionedCall(decoder_conv_t_3/StatefulPartitionedCall2>
dense/StatefulPartitionedCalldense/StatefulPartitionedCall:V R
'
_output_shapes
:���������

'
_user_specified_namedecoder_input
�

�
(__inference_decoder_layer_call_fn_223302

inputs
unknown:

��
	unknown_0:
��#
	unknown_1:@@
	unknown_2:@#
	unknown_3:@@
	unknown_4:@#
	unknown_5: @
	unknown_6: #
	unknown_7: 
	unknown_8:
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0	unknown_1	unknown_2	unknown_3	unknown_4	unknown_5	unknown_6	unknown_7	unknown_8*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*,
_read_only_resource_inputs

	
*-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_decoder_layer_call_and_return_conditional_losses_2228102
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 22
StatefulPartitionedCallStatefulPartitionedCall:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�
�
1__inference_decoder_conv_t_0_layer_call_fn_222590

inputs!
unknown:@@
	unknown_0:@
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_2225802
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+���������������������������@: : 22
StatefulPartitionedCallStatefulPartitionedCall:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
�
&__inference_dense_layer_call_fn_223346

inputs
unknown:

��
	unknown_0:
��
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *)
_output_shapes
:�����������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *J
fERC
A__inference_dense_layer_call_and_return_conditional_losses_2227392
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*)
_output_shapes
:�����������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime**
_input_shapes
:���������
: : 22
StatefulPartitionedCallStatefulPartitionedCall:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
��
�	
C__inference_decoder_layer_call_and_return_conditional_losses_223177

inputs8
$dense_matmul_readvariableop_resource:

��5
%dense_biasadd_readvariableop_resource:
��S
9decoder_conv_t_0_conv2d_transpose_readvariableop_resource:@@>
0decoder_conv_t_0_biasadd_readvariableop_resource:@S
9decoder_conv_t_1_conv2d_transpose_readvariableop_resource:@@>
0decoder_conv_t_1_biasadd_readvariableop_resource:@S
9decoder_conv_t_2_conv2d_transpose_readvariableop_resource: @>
0decoder_conv_t_2_biasadd_readvariableop_resource: S
9decoder_conv_t_3_conv2d_transpose_readvariableop_resource: >
0decoder_conv_t_3_biasadd_readvariableop_resource:
identity��'decoder_conv_t_0/BiasAdd/ReadVariableOp�0decoder_conv_t_0/conv2d_transpose/ReadVariableOp�'decoder_conv_t_1/BiasAdd/ReadVariableOp�0decoder_conv_t_1/conv2d_transpose/ReadVariableOp�'decoder_conv_t_2/BiasAdd/ReadVariableOp�0decoder_conv_t_2/conv2d_transpose/ReadVariableOp�'decoder_conv_t_3/BiasAdd/ReadVariableOp�0decoder_conv_t_3/conv2d_transpose/ReadVariableOp�dense/BiasAdd/ReadVariableOp�dense/MatMul/ReadVariableOp�
dense/MatMul/ReadVariableOpReadVariableOp$dense_matmul_readvariableop_resource* 
_output_shapes
:

��*
dtype02
dense/MatMul/ReadVariableOp�
dense/MatMulMatMulinputs#dense/MatMul/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
dense/MatMul�
dense/BiasAdd/ReadVariableOpReadVariableOp%dense_biasadd_readvariableop_resource*
_output_shapes

:��*
dtype02
dense/BiasAdd/ReadVariableOp�
dense/BiasAddBiasAdddense/MatMul:product:0$dense/BiasAdd/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
dense/BiasAddd
reshape/ShapeShapedense/BiasAdd:output:0*
T0*
_output_shapes
:2
reshape/Shape�
reshape/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
reshape/strided_slice/stack�
reshape/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
reshape/strided_slice/stack_1�
reshape/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
reshape/strided_slice/stack_2�
reshape/strided_sliceStridedSlicereshape/Shape:output:0$reshape/strided_slice/stack:output:0&reshape/strided_slice/stack_1:output:0&reshape/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
reshape/strided_slicet
reshape/Reshape/shape/1Const*
_output_shapes
: *
dtype0*
value	B :2
reshape/Reshape/shape/1t
reshape/Reshape/shape/2Const*
_output_shapes
: *
dtype0*
value	B :2
reshape/Reshape/shape/2t
reshape/Reshape/shape/3Const*
_output_shapes
: *
dtype0*
value	B :@2
reshape/Reshape/shape/3�
reshape/Reshape/shapePackreshape/strided_slice:output:0 reshape/Reshape/shape/1:output:0 reshape/Reshape/shape/2:output:0 reshape/Reshape/shape/3:output:0*
N*
T0*
_output_shapes
:2
reshape/Reshape/shape�
reshape/ReshapeReshapedense/BiasAdd:output:0reshape/Reshape/shape:output:0*
T0*/
_output_shapes
:���������@2
reshape/Reshapex
decoder_conv_t_0/ShapeShapereshape/Reshape:output:0*
T0*
_output_shapes
:2
decoder_conv_t_0/Shape�
$decoder_conv_t_0/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_0/strided_slice/stack�
&decoder_conv_t_0/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_0/strided_slice/stack_1�
&decoder_conv_t_0/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_0/strided_slice/stack_2�
decoder_conv_t_0/strided_sliceStridedSlicedecoder_conv_t_0/Shape:output:0-decoder_conv_t_0/strided_slice/stack:output:0/decoder_conv_t_0/strided_slice/stack_1:output:0/decoder_conv_t_0/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_0/strided_slicev
decoder_conv_t_0/stack/1Const*
_output_shapes
: *
dtype0*
value	B :2
decoder_conv_t_0/stack/1v
decoder_conv_t_0/stack/2Const*
_output_shapes
: *
dtype0*
value	B :2
decoder_conv_t_0/stack/2v
decoder_conv_t_0/stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2
decoder_conv_t_0/stack/3�
decoder_conv_t_0/stackPack'decoder_conv_t_0/strided_slice:output:0!decoder_conv_t_0/stack/1:output:0!decoder_conv_t_0/stack/2:output:0!decoder_conv_t_0/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_0/stack�
&decoder_conv_t_0/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_0/strided_slice_1/stack�
(decoder_conv_t_0/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_0/strided_slice_1/stack_1�
(decoder_conv_t_0/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_0/strided_slice_1/stack_2�
 decoder_conv_t_0/strided_slice_1StridedSlicedecoder_conv_t_0/stack:output:0/decoder_conv_t_0/strided_slice_1/stack:output:01decoder_conv_t_0/strided_slice_1/stack_1:output:01decoder_conv_t_0/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_0/strided_slice_1�
0decoder_conv_t_0/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_0_conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype022
0decoder_conv_t_0/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_0/conv2d_transposeConv2DBackpropInputdecoder_conv_t_0/stack:output:08decoder_conv_t_0/conv2d_transpose/ReadVariableOp:value:0reshape/Reshape:output:0*
T0*/
_output_shapes
:���������@*
paddingSAME*
strides
2#
!decoder_conv_t_0/conv2d_transpose�
'decoder_conv_t_0/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_0_biasadd_readvariableop_resource*
_output_shapes
:@*
dtype02)
'decoder_conv_t_0/BiasAdd/ReadVariableOp�
decoder_conv_t_0/BiasAddBiasAdd*decoder_conv_t_0/conv2d_transpose:output:0/decoder_conv_t_0/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������@2
decoder_conv_t_0/BiasAdd�
leaky_re_lu_4/LeakyRelu	LeakyRelu!decoder_conv_t_0/BiasAdd:output:0*/
_output_shapes
:���������@*
alpha%���>2
leaky_re_lu_4/LeakyRelu�
decoder_conv_t_1/ShapeShape%leaky_re_lu_4/LeakyRelu:activations:0*
T0*
_output_shapes
:2
decoder_conv_t_1/Shape�
$decoder_conv_t_1/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_1/strided_slice/stack�
&decoder_conv_t_1/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_1/strided_slice/stack_1�
&decoder_conv_t_1/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_1/strided_slice/stack_2�
decoder_conv_t_1/strided_sliceStridedSlicedecoder_conv_t_1/Shape:output:0-decoder_conv_t_1/strided_slice/stack:output:0/decoder_conv_t_1/strided_slice/stack_1:output:0/decoder_conv_t_1/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_1/strided_slicev
decoder_conv_t_1/stack/1Const*
_output_shapes
: *
dtype0*
value	B :22
decoder_conv_t_1/stack/1v
decoder_conv_t_1/stack/2Const*
_output_shapes
: *
dtype0*
value	B :22
decoder_conv_t_1/stack/2v
decoder_conv_t_1/stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2
decoder_conv_t_1/stack/3�
decoder_conv_t_1/stackPack'decoder_conv_t_1/strided_slice:output:0!decoder_conv_t_1/stack/1:output:0!decoder_conv_t_1/stack/2:output:0!decoder_conv_t_1/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_1/stack�
&decoder_conv_t_1/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_1/strided_slice_1/stack�
(decoder_conv_t_1/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_1/strided_slice_1/stack_1�
(decoder_conv_t_1/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_1/strided_slice_1/stack_2�
 decoder_conv_t_1/strided_slice_1StridedSlicedecoder_conv_t_1/stack:output:0/decoder_conv_t_1/strided_slice_1/stack:output:01decoder_conv_t_1/strided_slice_1/stack_1:output:01decoder_conv_t_1/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_1/strided_slice_1�
0decoder_conv_t_1/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_1_conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype022
0decoder_conv_t_1/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_1/conv2d_transposeConv2DBackpropInputdecoder_conv_t_1/stack:output:08decoder_conv_t_1/conv2d_transpose/ReadVariableOp:value:0%leaky_re_lu_4/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������22@*
paddingSAME*
strides
2#
!decoder_conv_t_1/conv2d_transpose�
'decoder_conv_t_1/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_1_biasadd_readvariableop_resource*
_output_shapes
:@*
dtype02)
'decoder_conv_t_1/BiasAdd/ReadVariableOp�
decoder_conv_t_1/BiasAddBiasAdd*decoder_conv_t_1/conv2d_transpose:output:0/decoder_conv_t_1/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������22@2
decoder_conv_t_1/BiasAdd�
leaky_re_lu_5/LeakyRelu	LeakyRelu!decoder_conv_t_1/BiasAdd:output:0*/
_output_shapes
:���������22@*
alpha%���>2
leaky_re_lu_5/LeakyRelu�
decoder_conv_t_2/ShapeShape%leaky_re_lu_5/LeakyRelu:activations:0*
T0*
_output_shapes
:2
decoder_conv_t_2/Shape�
$decoder_conv_t_2/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_2/strided_slice/stack�
&decoder_conv_t_2/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_2/strided_slice/stack_1�
&decoder_conv_t_2/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_2/strided_slice/stack_2�
decoder_conv_t_2/strided_sliceStridedSlicedecoder_conv_t_2/Shape:output:0-decoder_conv_t_2/strided_slice/stack:output:0/decoder_conv_t_2/strided_slice/stack_1:output:0/decoder_conv_t_2/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_2/strided_slicev
decoder_conv_t_2/stack/1Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_2/stack/1v
decoder_conv_t_2/stack/2Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_2/stack/2v
decoder_conv_t_2/stack/3Const*
_output_shapes
: *
dtype0*
value	B : 2
decoder_conv_t_2/stack/3�
decoder_conv_t_2/stackPack'decoder_conv_t_2/strided_slice:output:0!decoder_conv_t_2/stack/1:output:0!decoder_conv_t_2/stack/2:output:0!decoder_conv_t_2/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_2/stack�
&decoder_conv_t_2/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_2/strided_slice_1/stack�
(decoder_conv_t_2/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_2/strided_slice_1/stack_1�
(decoder_conv_t_2/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_2/strided_slice_1/stack_2�
 decoder_conv_t_2/strided_slice_1StridedSlicedecoder_conv_t_2/stack:output:0/decoder_conv_t_2/strided_slice_1/stack:output:01decoder_conv_t_2/strided_slice_1/stack_1:output:01decoder_conv_t_2/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_2/strided_slice_1�
0decoder_conv_t_2/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_2_conv2d_transpose_readvariableop_resource*&
_output_shapes
: @*
dtype022
0decoder_conv_t_2/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_2/conv2d_transposeConv2DBackpropInputdecoder_conv_t_2/stack:output:08decoder_conv_t_2/conv2d_transpose/ReadVariableOp:value:0%leaky_re_lu_5/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������dd *
paddingSAME*
strides
2#
!decoder_conv_t_2/conv2d_transpose�
'decoder_conv_t_2/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_2_biasadd_readvariableop_resource*
_output_shapes
: *
dtype02)
'decoder_conv_t_2/BiasAdd/ReadVariableOp�
decoder_conv_t_2/BiasAddBiasAdd*decoder_conv_t_2/conv2d_transpose:output:0/decoder_conv_t_2/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������dd 2
decoder_conv_t_2/BiasAdd�
leaky_re_lu_6/LeakyRelu	LeakyRelu!decoder_conv_t_2/BiasAdd:output:0*/
_output_shapes
:���������dd *
alpha%���>2
leaky_re_lu_6/LeakyRelu�
decoder_conv_t_3/ShapeShape%leaky_re_lu_6/LeakyRelu:activations:0*
T0*
_output_shapes
:2
decoder_conv_t_3/Shape�
$decoder_conv_t_3/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2&
$decoder_conv_t_3/strided_slice/stack�
&decoder_conv_t_3/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_3/strided_slice/stack_1�
&decoder_conv_t_3/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2(
&decoder_conv_t_3/strided_slice/stack_2�
decoder_conv_t_3/strided_sliceStridedSlicedecoder_conv_t_3/Shape:output:0-decoder_conv_t_3/strided_slice/stack:output:0/decoder_conv_t_3/strided_slice/stack_1:output:0/decoder_conv_t_3/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2 
decoder_conv_t_3/strided_slicev
decoder_conv_t_3/stack/1Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_3/stack/1v
decoder_conv_t_3/stack/2Const*
_output_shapes
: *
dtype0*
value	B :d2
decoder_conv_t_3/stack/2v
decoder_conv_t_3/stack/3Const*
_output_shapes
: *
dtype0*
value	B :2
decoder_conv_t_3/stack/3�
decoder_conv_t_3/stackPack'decoder_conv_t_3/strided_slice:output:0!decoder_conv_t_3/stack/1:output:0!decoder_conv_t_3/stack/2:output:0!decoder_conv_t_3/stack/3:output:0*
N*
T0*
_output_shapes
:2
decoder_conv_t_3/stack�
&decoder_conv_t_3/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 2(
&decoder_conv_t_3/strided_slice_1/stack�
(decoder_conv_t_3/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_3/strided_slice_1/stack_1�
(decoder_conv_t_3/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2*
(decoder_conv_t_3/strided_slice_1/stack_2�
 decoder_conv_t_3/strided_slice_1StridedSlicedecoder_conv_t_3/stack:output:0/decoder_conv_t_3/strided_slice_1/stack:output:01decoder_conv_t_3/strided_slice_1/stack_1:output:01decoder_conv_t_3/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2"
 decoder_conv_t_3/strided_slice_1�
0decoder_conv_t_3/conv2d_transpose/ReadVariableOpReadVariableOp9decoder_conv_t_3_conv2d_transpose_readvariableop_resource*&
_output_shapes
: *
dtype022
0decoder_conv_t_3/conv2d_transpose/ReadVariableOp�
!decoder_conv_t_3/conv2d_transposeConv2DBackpropInputdecoder_conv_t_3/stack:output:08decoder_conv_t_3/conv2d_transpose/ReadVariableOp:value:0%leaky_re_lu_6/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������dd*
paddingSAME*
strides
2#
!decoder_conv_t_3/conv2d_transpose�
'decoder_conv_t_3/BiasAdd/ReadVariableOpReadVariableOp0decoder_conv_t_3_biasadd_readvariableop_resource*
_output_shapes
:*
dtype02)
'decoder_conv_t_3/BiasAdd/ReadVariableOp�
decoder_conv_t_3/BiasAddBiasAdd*decoder_conv_t_3/conv2d_transpose:output:0/decoder_conv_t_3/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������dd2
decoder_conv_t_3/BiasAdd�
activation/SigmoidSigmoid!decoder_conv_t_3/BiasAdd:output:0*
T0*/
_output_shapes
:���������dd2
activation/Sigmoid�
IdentityIdentityactivation/Sigmoid:y:0(^decoder_conv_t_0/BiasAdd/ReadVariableOp1^decoder_conv_t_0/conv2d_transpose/ReadVariableOp(^decoder_conv_t_1/BiasAdd/ReadVariableOp1^decoder_conv_t_1/conv2d_transpose/ReadVariableOp(^decoder_conv_t_2/BiasAdd/ReadVariableOp1^decoder_conv_t_2/conv2d_transpose/ReadVariableOp(^decoder_conv_t_3/BiasAdd/ReadVariableOp1^decoder_conv_t_3/conv2d_transpose/ReadVariableOp^dense/BiasAdd/ReadVariableOp^dense/MatMul/ReadVariableOp*
T0*/
_output_shapes
:���������dd2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 2R
'decoder_conv_t_0/BiasAdd/ReadVariableOp'decoder_conv_t_0/BiasAdd/ReadVariableOp2d
0decoder_conv_t_0/conv2d_transpose/ReadVariableOp0decoder_conv_t_0/conv2d_transpose/ReadVariableOp2R
'decoder_conv_t_1/BiasAdd/ReadVariableOp'decoder_conv_t_1/BiasAdd/ReadVariableOp2d
0decoder_conv_t_1/conv2d_transpose/ReadVariableOp0decoder_conv_t_1/conv2d_transpose/ReadVariableOp2R
'decoder_conv_t_2/BiasAdd/ReadVariableOp'decoder_conv_t_2/BiasAdd/ReadVariableOp2d
0decoder_conv_t_2/conv2d_transpose/ReadVariableOp0decoder_conv_t_2/conv2d_transpose/ReadVariableOp2R
'decoder_conv_t_3/BiasAdd/ReadVariableOp'decoder_conv_t_3/BiasAdd/ReadVariableOp2d
0decoder_conv_t_3/conv2d_transpose/ReadVariableOp0decoder_conv_t_3/conv2d_transpose/ReadVariableOp2<
dense/BiasAdd/ReadVariableOpdense/BiasAdd/ReadVariableOp2:
dense/MatMul/ReadVariableOpdense/MatMul/ReadVariableOp:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�
_
C__inference_reshape_layer_call_and_return_conditional_losses_222759

inputs
identityD
ShapeShapeinputs*
T0*
_output_shapes
:2
Shapet
strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2
strided_slice/stackx
strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_1x
strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2
strided_slice/stack_2�
strided_sliceStridedSliceShape:output:0strided_slice/stack:output:0strided_slice/stack_1:output:0strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
strided_sliced
Reshape/shape/1Const*
_output_shapes
: *
dtype0*
value	B :2
Reshape/shape/1d
Reshape/shape/2Const*
_output_shapes
: *
dtype0*
value	B :2
Reshape/shape/2d
Reshape/shape/3Const*
_output_shapes
: *
dtype0*
value	B :@2
Reshape/shape/3�
Reshape/shapePackstrided_slice:output:0Reshape/shape/1:output:0Reshape/shape/2:output:0Reshape/shape/3:output:0*
N*
T0*
_output_shapes
:2
Reshape/shapew
ReshapeReshapeinputsReshape/shape:output:0*
T0*/
_output_shapes
:���������@2	
Reshapel
IdentityIdentityReshape:output:0*
T0*/
_output_shapes
:���������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*(
_input_shapes
:�����������:Q M
)
_output_shapes
:�����������
 
_user_specified_nameinputs
�	
�
A__inference_dense_layer_call_and_return_conditional_losses_222739

inputs2
matmul_readvariableop_resource:

��/
biasadd_readvariableop_resource:
��
identity��BiasAdd/ReadVariableOp�MatMul/ReadVariableOp�
MatMul/ReadVariableOpReadVariableOpmatmul_readvariableop_resource* 
_output_shapes
:

��*
dtype02
MatMul/ReadVariableOpu
MatMulMatMulinputsMatMul/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
MatMul�
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes

:��*
dtype02
BiasAdd/ReadVariableOp�
BiasAddBiasAddMatMul:product:0BiasAdd/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2	
BiasAdd�
IdentityIdentityBiasAdd:output:0^BiasAdd/ReadVariableOp^MatMul/ReadVariableOp*
T0*)
_output_shapes
:�����������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime**
_input_shapes
:���������
: : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp2.
MatMul/ReadVariableOpMatMul/ReadVariableOp:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�#
�
__inference__traced_save_223458
file_prefix+
'savev2_dense_kernel_read_readvariableop)
%savev2_dense_bias_read_readvariableop6
2savev2_decoder_conv_t_0_kernel_read_readvariableop4
0savev2_decoder_conv_t_0_bias_read_readvariableop6
2savev2_decoder_conv_t_1_kernel_read_readvariableop4
0savev2_decoder_conv_t_1_bias_read_readvariableop6
2savev2_decoder_conv_t_2_kernel_read_readvariableop4
0savev2_decoder_conv_t_2_bias_read_readvariableop6
2savev2_decoder_conv_t_3_kernel_read_readvariableop4
0savev2_decoder_conv_t_3_bias_read_readvariableop
savev2_const

identity_1��MergeV2Checkpoints�
StaticRegexFullMatchStaticRegexFullMatchfile_prefix"/device:CPU:**
_output_shapes
: *
pattern
^s3://.*2
StaticRegexFullMatchc
ConstConst"/device:CPU:**
_output_shapes
: *
dtype0*
valueB B.part2
Constl
Const_1Const"/device:CPU:**
_output_shapes
: *
dtype0*
valueB B
_temp/part2	
Const_1�
SelectSelectStaticRegexFullMatch:output:0Const:output:0Const_1:output:0"/device:CPU:**
T0*
_output_shapes
: 2
Selectt

StringJoin
StringJoinfile_prefixSelect:output:0"/device:CPU:**
N*
_output_shapes
: 2

StringJoinZ

num_shardsConst*
_output_shapes
: *
dtype0*
value	B :2

num_shards
ShardedFilename/shardConst"/device:CPU:0*
_output_shapes
: *
dtype0*
value	B : 2
ShardedFilename/shard�
ShardedFilenameShardedFilenameStringJoin:output:0ShardedFilename/shard:output:0num_shards:output:0"/device:CPU:0*
_output_shapes
: 2
ShardedFilename�
SaveV2/tensor_namesConst"/device:CPU:0*
_output_shapes
:*
dtype0*�
value�B�B6layer_with_weights-0/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-0/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-1/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-1/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-2/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-2/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-3/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-3/bias/.ATTRIBUTES/VARIABLE_VALUEB6layer_with_weights-4/kernel/.ATTRIBUTES/VARIABLE_VALUEB4layer_with_weights-4/bias/.ATTRIBUTES/VARIABLE_VALUEB_CHECKPOINTABLE_OBJECT_GRAPH2
SaveV2/tensor_names�
SaveV2/shape_and_slicesConst"/device:CPU:0*
_output_shapes
:*
dtype0*)
value BB B B B B B B B B B B 2
SaveV2/shape_and_slices�
SaveV2SaveV2ShardedFilename:filename:0SaveV2/tensor_names:output:0 SaveV2/shape_and_slices:output:0'savev2_dense_kernel_read_readvariableop%savev2_dense_bias_read_readvariableop2savev2_decoder_conv_t_0_kernel_read_readvariableop0savev2_decoder_conv_t_0_bias_read_readvariableop2savev2_decoder_conv_t_1_kernel_read_readvariableop0savev2_decoder_conv_t_1_bias_read_readvariableop2savev2_decoder_conv_t_2_kernel_read_readvariableop0savev2_decoder_conv_t_2_bias_read_readvariableop2savev2_decoder_conv_t_3_kernel_read_readvariableop0savev2_decoder_conv_t_3_bias_read_readvariableopsavev2_const"/device:CPU:0*
_output_shapes
 *
dtypes
22
SaveV2�
&MergeV2Checkpoints/checkpoint_prefixesPackShardedFilename:filename:0^SaveV2"/device:CPU:0*
N*
T0*
_output_shapes
:2(
&MergeV2Checkpoints/checkpoint_prefixes�
MergeV2CheckpointsMergeV2Checkpoints/MergeV2Checkpoints/checkpoint_prefixes:output:0file_prefix"/device:CPU:0*
_output_shapes
 2
MergeV2Checkpointsr
IdentityIdentityfile_prefix^MergeV2Checkpoints"/device:CPU:0*
T0*
_output_shapes
: 2

Identitym

Identity_1IdentityIdentity:output:0^MergeV2Checkpoints*
T0*
_output_shapes
: 2

Identity_1"!

identity_1Identity_1:output:0*�
_input_shapesz
x: :

��:��:@@:@:@@:@: @: : :: 2(
MergeV2CheckpointsMergeV2Checkpoints:C ?

_output_shapes
: 
%
_user_specified_namefile_prefix:&"
 
_output_shapes
:

��:"

_output_shapes

:��:,(
&
_output_shapes
:@@: 

_output_shapes
:@:,(
&
_output_shapes
:@@: 

_output_shapes
:@:,(
&
_output_shapes
: @: 

_output_shapes
: :,	(
&
_output_shapes
: : 


_output_shapes
::

_output_shapes
: 
�
J
.__inference_leaky_re_lu_5_layer_call_fn_223385

inputs
identity�
PartitionedCallPartitionedCallinputs*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_2227832
PartitionedCall�
IdentityIdentityPartitionedCall:output:0*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������@:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
�
1__inference_decoder_conv_t_3_layer_call_fn_222722

inputs!
unknown: 
	unknown_0:
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_2227122
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+��������������������������� : : 22
StatefulPartitionedCallStatefulPartitionedCall:i e
A
_output_shapes/
-:+��������������������������� 
 
_user_specified_nameinputs
�

�
(__inference_decoder_layer_call_fn_223327

inputs
unknown:

��
	unknown_0:
��#
	unknown_1:@@
	unknown_2:@#
	unknown_3:@@
	unknown_4:@#
	unknown_5: @
	unknown_6: #
	unknown_7: 
	unknown_8:
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0	unknown_1	unknown_2	unknown_3	unknown_4	unknown_5	unknown_6	unknown_7	unknown_8*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*,
_read_only_resource_inputs

	
*-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_decoder_layer_call_and_return_conditional_losses_2229342
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 22
StatefulPartitionedCallStatefulPartitionedCall:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�
b
F__inference_activation_layer_call_and_return_conditional_losses_223400

inputs
identityq
SigmoidSigmoidinputs*
T0*A
_output_shapes/
-:+���������������������������2	
Sigmoidy
IdentityIdentitySigmoid:y:0*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������:i e
A
_output_shapes/
-:+���������������������������
 
_user_specified_nameinputs
�
b
F__inference_activation_layer_call_and_return_conditional_losses_222807

inputs
identityq
SigmoidSigmoidinputs*
T0*A
_output_shapes/
-:+���������������������������2	
Sigmoidy
IdentityIdentitySigmoid:y:0*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������:i e
A
_output_shapes/
-:+���������������������������
 
_user_specified_nameinputs
�0
�
C__inference_decoder_layer_call_and_return_conditional_losses_222810

inputs 
dense_222740:

��
dense_222742:
��1
decoder_conv_t_0_222761:@@%
decoder_conv_t_0_222763:@1
decoder_conv_t_1_222773:@@%
decoder_conv_t_1_222775:@1
decoder_conv_t_2_222785: @%
decoder_conv_t_2_222787: 1
decoder_conv_t_3_222797: %
decoder_conv_t_3_222799:
identity��(decoder_conv_t_0/StatefulPartitionedCall�(decoder_conv_t_1/StatefulPartitionedCall�(decoder_conv_t_2/StatefulPartitionedCall�(decoder_conv_t_3/StatefulPartitionedCall�dense/StatefulPartitionedCall�
dense/StatefulPartitionedCallStatefulPartitionedCallinputsdense_222740dense_222742*
Tin
2*
Tout
2*
_collective_manager_ids
 *)
_output_shapes
:�����������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *J
fERC
A__inference_dense_layer_call_and_return_conditional_losses_2227392
dense/StatefulPartitionedCall�
reshape/PartitionedCallPartitionedCall&dense/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 */
_output_shapes
:���������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_reshape_layer_call_and_return_conditional_losses_2227592
reshape/PartitionedCall�
(decoder_conv_t_0/StatefulPartitionedCallStatefulPartitionedCall reshape/PartitionedCall:output:0decoder_conv_t_0_222761decoder_conv_t_0_222763*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_2225802*
(decoder_conv_t_0/StatefulPartitionedCall�
leaky_re_lu_4/PartitionedCallPartitionedCall1decoder_conv_t_0/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_2227712
leaky_re_lu_4/PartitionedCall�
(decoder_conv_t_1/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_4/PartitionedCall:output:0decoder_conv_t_1_222773decoder_conv_t_1_222775*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_2226242*
(decoder_conv_t_1/StatefulPartitionedCall�
leaky_re_lu_5/PartitionedCallPartitionedCall1decoder_conv_t_1/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_2227832
leaky_re_lu_5/PartitionedCall�
(decoder_conv_t_2/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_5/PartitionedCall:output:0decoder_conv_t_2_222785decoder_conv_t_2_222787*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� *$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_2226682*
(decoder_conv_t_2/StatefulPartitionedCall�
leaky_re_lu_6/PartitionedCallPartitionedCall1decoder_conv_t_2/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� * 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_2227952
leaky_re_lu_6/PartitionedCall�
(decoder_conv_t_3/StatefulPartitionedCallStatefulPartitionedCall&leaky_re_lu_6/PartitionedCall:output:0decoder_conv_t_3_222797decoder_conv_t_3_222799*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_2227122*
(decoder_conv_t_3/StatefulPartitionedCall�
activation/PartitionedCallPartitionedCall1decoder_conv_t_3/StatefulPartitionedCall:output:0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *O
fJRH
F__inference_activation_layer_call_and_return_conditional_losses_2228072
activation/PartitionedCall�
IdentityIdentity#activation/PartitionedCall:output:0)^decoder_conv_t_0/StatefulPartitionedCall)^decoder_conv_t_1/StatefulPartitionedCall)^decoder_conv_t_2/StatefulPartitionedCall)^decoder_conv_t_3/StatefulPartitionedCall^dense/StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 2T
(decoder_conv_t_0/StatefulPartitionedCall(decoder_conv_t_0/StatefulPartitionedCall2T
(decoder_conv_t_1/StatefulPartitionedCall(decoder_conv_t_1/StatefulPartitionedCall2T
(decoder_conv_t_2/StatefulPartitionedCall(decoder_conv_t_2/StatefulPartitionedCall2T
(decoder_conv_t_3/StatefulPartitionedCall(decoder_conv_t_3/StatefulPartitionedCall2>
dense/StatefulPartitionedCalldense/StatefulPartitionedCall:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�
e
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_223370

inputs
identity~
	LeakyRelu	LeakyReluinputs*A
_output_shapes/
-:+���������������������������@*
alpha%���>2
	LeakyRelu�
IdentityIdentityLeakyRelu:activations:0*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������@:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
J
.__inference_leaky_re_lu_4_layer_call_fn_223375

inputs
identity�
PartitionedCallPartitionedCallinputs*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *R
fMRK
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_2227712
PartitionedCall�
IdentityIdentityPartitionedCall:output:0*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������@:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
e
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_223390

inputs
identity~
	LeakyRelu	LeakyReluinputs*A
_output_shapes/
-:+��������������������������� *
alpha%���>2
	LeakyRelu�
IdentityIdentityLeakyRelu:activations:0*
T0*A
_output_shapes/
-:+��������������������������� 2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+��������������������������� :i e
A
_output_shapes/
-:+��������������������������� 
 
_user_specified_nameinputs
�
�
1__inference_decoder_conv_t_2_layer_call_fn_222678

inputs!
unknown: @
	unknown_0: 
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+��������������������������� *$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_2226682
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+��������������������������� 2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+���������������������������@: : 22
StatefulPartitionedCallStatefulPartitionedCall:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�	
�
A__inference_dense_layer_call_and_return_conditional_losses_223337

inputs2
matmul_readvariableop_resource:

��/
biasadd_readvariableop_resource:
��
identity��BiasAdd/ReadVariableOp�MatMul/ReadVariableOp�
MatMul/ReadVariableOpReadVariableOpmatmul_readvariableop_resource* 
_output_shapes
:

��*
dtype02
MatMul/ReadVariableOpu
MatMulMatMulinputsMatMul/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
MatMul�
BiasAdd/ReadVariableOpReadVariableOpbiasadd_readvariableop_resource*
_output_shapes

:��*
dtype02
BiasAdd/ReadVariableOp�
BiasAddBiasAddMatMul:product:0BiasAdd/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2	
BiasAdd�
IdentityIdentityBiasAdd:output:0^BiasAdd/ReadVariableOp^MatMul/ReadVariableOp*
T0*)
_output_shapes
:�����������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime**
_input_shapes
:���������
: : 20
BiasAdd/ReadVariableOpBiasAdd/ReadVariableOp2.
MatMul/ReadVariableOpMatMul/ReadVariableOp:O K
'
_output_shapes
:���������

 
_user_specified_nameinputs
�
e
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_223380

inputs
identity~
	LeakyRelu	LeakyReluinputs*A
_output_shapes/
-:+���������������������������@*
alpha%���>2
	LeakyRelu�
IdentityIdentityLeakyRelu:activations:0*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������@:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
G
+__inference_activation_layer_call_fn_223405

inputs
identity�
PartitionedCallPartitionedCallinputs*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *O
fJRH
F__inference_activation_layer_call_and_return_conditional_losses_2228072
PartitionedCall�
IdentityIdentityPartitionedCall:output:0*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������:i e
A
_output_shapes/
-:+���������������������������
 
_user_specified_nameinputs
�

�
(__inference_decoder_layer_call_fn_222982
decoder_input
unknown:

��
	unknown_0:
��#
	unknown_1:@@
	unknown_2:@#
	unknown_3:@@
	unknown_4:@#
	unknown_5: @
	unknown_6: #
	unknown_7: 
	unknown_8:
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCalldecoder_inputunknown	unknown_0	unknown_1	unknown_2	unknown_3	unknown_4	unknown_5	unknown_6	unknown_7	unknown_8*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*,
_read_only_resource_inputs

	
*-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_decoder_layer_call_and_return_conditional_losses_2229342
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 22
StatefulPartitionedCallStatefulPartitionedCall:V R
'
_output_shapes
:���������

'
_user_specified_namedecoder_input
�

�
(__inference_decoder_layer_call_fn_222833
decoder_input
unknown:

��
	unknown_0:
��#
	unknown_1:@@
	unknown_2:@#
	unknown_3:@@
	unknown_4:@#
	unknown_5: @
	unknown_6: #
	unknown_7: 
	unknown_8:
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCalldecoder_inputunknown	unknown_0	unknown_1	unknown_2	unknown_3	unknown_4	unknown_5	unknown_6	unknown_7	unknown_8*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������*,
_read_only_resource_inputs

	
*-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_decoder_layer_call_and_return_conditional_losses_2228102
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 22
StatefulPartitionedCallStatefulPartitionedCall:V R
'
_output_shapes
:���������

'
_user_specified_namedecoder_input
ʨ
�

!__inference__wrapped_model_222546
decoder_input@
,decoder_dense_matmul_readvariableop_resource:

��=
-decoder_dense_biasadd_readvariableop_resource:
��[
Adecoder_decoder_conv_t_0_conv2d_transpose_readvariableop_resource:@@F
8decoder_decoder_conv_t_0_biasadd_readvariableop_resource:@[
Adecoder_decoder_conv_t_1_conv2d_transpose_readvariableop_resource:@@F
8decoder_decoder_conv_t_1_biasadd_readvariableop_resource:@[
Adecoder_decoder_conv_t_2_conv2d_transpose_readvariableop_resource: @F
8decoder_decoder_conv_t_2_biasadd_readvariableop_resource: [
Adecoder_decoder_conv_t_3_conv2d_transpose_readvariableop_resource: F
8decoder_decoder_conv_t_3_biasadd_readvariableop_resource:
identity��/decoder/decoder_conv_t_0/BiasAdd/ReadVariableOp�8decoder/decoder_conv_t_0/conv2d_transpose/ReadVariableOp�/decoder/decoder_conv_t_1/BiasAdd/ReadVariableOp�8decoder/decoder_conv_t_1/conv2d_transpose/ReadVariableOp�/decoder/decoder_conv_t_2/BiasAdd/ReadVariableOp�8decoder/decoder_conv_t_2/conv2d_transpose/ReadVariableOp�/decoder/decoder_conv_t_3/BiasAdd/ReadVariableOp�8decoder/decoder_conv_t_3/conv2d_transpose/ReadVariableOp�$decoder/dense/BiasAdd/ReadVariableOp�#decoder/dense/MatMul/ReadVariableOp�
#decoder/dense/MatMul/ReadVariableOpReadVariableOp,decoder_dense_matmul_readvariableop_resource* 
_output_shapes
:

��*
dtype02%
#decoder/dense/MatMul/ReadVariableOp�
decoder/dense/MatMulMatMuldecoder_input+decoder/dense/MatMul/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
decoder/dense/MatMul�
$decoder/dense/BiasAdd/ReadVariableOpReadVariableOp-decoder_dense_biasadd_readvariableop_resource*
_output_shapes

:��*
dtype02&
$decoder/dense/BiasAdd/ReadVariableOp�
decoder/dense/BiasAddBiasAdddecoder/dense/MatMul:product:0,decoder/dense/BiasAdd/ReadVariableOp:value:0*
T0*)
_output_shapes
:�����������2
decoder/dense/BiasAdd|
decoder/reshape/ShapeShapedecoder/dense/BiasAdd:output:0*
T0*
_output_shapes
:2
decoder/reshape/Shape�
#decoder/reshape/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2%
#decoder/reshape/strided_slice/stack�
%decoder/reshape/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:2'
%decoder/reshape/strided_slice/stack_1�
%decoder/reshape/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:2'
%decoder/reshape/strided_slice/stack_2�
decoder/reshape/strided_sliceStridedSlicedecoder/reshape/Shape:output:0,decoder/reshape/strided_slice/stack:output:0.decoder/reshape/strided_slice/stack_1:output:0.decoder/reshape/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2
decoder/reshape/strided_slice�
decoder/reshape/Reshape/shape/1Const*
_output_shapes
: *
dtype0*
value	B :2!
decoder/reshape/Reshape/shape/1�
decoder/reshape/Reshape/shape/2Const*
_output_shapes
: *
dtype0*
value	B :2!
decoder/reshape/Reshape/shape/2�
decoder/reshape/Reshape/shape/3Const*
_output_shapes
: *
dtype0*
value	B :@2!
decoder/reshape/Reshape/shape/3�
decoder/reshape/Reshape/shapePack&decoder/reshape/strided_slice:output:0(decoder/reshape/Reshape/shape/1:output:0(decoder/reshape/Reshape/shape/2:output:0(decoder/reshape/Reshape/shape/3:output:0*
N*
T0*
_output_shapes
:2
decoder/reshape/Reshape/shape�
decoder/reshape/ReshapeReshapedecoder/dense/BiasAdd:output:0&decoder/reshape/Reshape/shape:output:0*
T0*/
_output_shapes
:���������@2
decoder/reshape/Reshape�
decoder/decoder_conv_t_0/ShapeShape decoder/reshape/Reshape:output:0*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_0/Shape�
,decoder/decoder_conv_t_0/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2.
,decoder/decoder_conv_t_0/strided_slice/stack�
.decoder/decoder_conv_t_0/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_0/strided_slice/stack_1�
.decoder/decoder_conv_t_0/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_0/strided_slice/stack_2�
&decoder/decoder_conv_t_0/strided_sliceStridedSlice'decoder/decoder_conv_t_0/Shape:output:05decoder/decoder_conv_t_0/strided_slice/stack:output:07decoder/decoder_conv_t_0/strided_slice/stack_1:output:07decoder/decoder_conv_t_0/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2(
&decoder/decoder_conv_t_0/strided_slice�
 decoder/decoder_conv_t_0/stack/1Const*
_output_shapes
: *
dtype0*
value	B :2"
 decoder/decoder_conv_t_0/stack/1�
 decoder/decoder_conv_t_0/stack/2Const*
_output_shapes
: *
dtype0*
value	B :2"
 decoder/decoder_conv_t_0/stack/2�
 decoder/decoder_conv_t_0/stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2"
 decoder/decoder_conv_t_0/stack/3�
decoder/decoder_conv_t_0/stackPack/decoder/decoder_conv_t_0/strided_slice:output:0)decoder/decoder_conv_t_0/stack/1:output:0)decoder/decoder_conv_t_0/stack/2:output:0)decoder/decoder_conv_t_0/stack/3:output:0*
N*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_0/stack�
.decoder/decoder_conv_t_0/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 20
.decoder/decoder_conv_t_0/strided_slice_1/stack�
0decoder/decoder_conv_t_0/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_0/strided_slice_1/stack_1�
0decoder/decoder_conv_t_0/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_0/strided_slice_1/stack_2�
(decoder/decoder_conv_t_0/strided_slice_1StridedSlice'decoder/decoder_conv_t_0/stack:output:07decoder/decoder_conv_t_0/strided_slice_1/stack:output:09decoder/decoder_conv_t_0/strided_slice_1/stack_1:output:09decoder/decoder_conv_t_0/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2*
(decoder/decoder_conv_t_0/strided_slice_1�
8decoder/decoder_conv_t_0/conv2d_transpose/ReadVariableOpReadVariableOpAdecoder_decoder_conv_t_0_conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype02:
8decoder/decoder_conv_t_0/conv2d_transpose/ReadVariableOp�
)decoder/decoder_conv_t_0/conv2d_transposeConv2DBackpropInput'decoder/decoder_conv_t_0/stack:output:0@decoder/decoder_conv_t_0/conv2d_transpose/ReadVariableOp:value:0 decoder/reshape/Reshape:output:0*
T0*/
_output_shapes
:���������@*
paddingSAME*
strides
2+
)decoder/decoder_conv_t_0/conv2d_transpose�
/decoder/decoder_conv_t_0/BiasAdd/ReadVariableOpReadVariableOp8decoder_decoder_conv_t_0_biasadd_readvariableop_resource*
_output_shapes
:@*
dtype021
/decoder/decoder_conv_t_0/BiasAdd/ReadVariableOp�
 decoder/decoder_conv_t_0/BiasAddBiasAdd2decoder/decoder_conv_t_0/conv2d_transpose:output:07decoder/decoder_conv_t_0/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������@2"
 decoder/decoder_conv_t_0/BiasAdd�
decoder/leaky_re_lu_4/LeakyRelu	LeakyRelu)decoder/decoder_conv_t_0/BiasAdd:output:0*/
_output_shapes
:���������@*
alpha%���>2!
decoder/leaky_re_lu_4/LeakyRelu�
decoder/decoder_conv_t_1/ShapeShape-decoder/leaky_re_lu_4/LeakyRelu:activations:0*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_1/Shape�
,decoder/decoder_conv_t_1/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2.
,decoder/decoder_conv_t_1/strided_slice/stack�
.decoder/decoder_conv_t_1/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_1/strided_slice/stack_1�
.decoder/decoder_conv_t_1/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_1/strided_slice/stack_2�
&decoder/decoder_conv_t_1/strided_sliceStridedSlice'decoder/decoder_conv_t_1/Shape:output:05decoder/decoder_conv_t_1/strided_slice/stack:output:07decoder/decoder_conv_t_1/strided_slice/stack_1:output:07decoder/decoder_conv_t_1/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2(
&decoder/decoder_conv_t_1/strided_slice�
 decoder/decoder_conv_t_1/stack/1Const*
_output_shapes
: *
dtype0*
value	B :22"
 decoder/decoder_conv_t_1/stack/1�
 decoder/decoder_conv_t_1/stack/2Const*
_output_shapes
: *
dtype0*
value	B :22"
 decoder/decoder_conv_t_1/stack/2�
 decoder/decoder_conv_t_1/stack/3Const*
_output_shapes
: *
dtype0*
value	B :@2"
 decoder/decoder_conv_t_1/stack/3�
decoder/decoder_conv_t_1/stackPack/decoder/decoder_conv_t_1/strided_slice:output:0)decoder/decoder_conv_t_1/stack/1:output:0)decoder/decoder_conv_t_1/stack/2:output:0)decoder/decoder_conv_t_1/stack/3:output:0*
N*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_1/stack�
.decoder/decoder_conv_t_1/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 20
.decoder/decoder_conv_t_1/strided_slice_1/stack�
0decoder/decoder_conv_t_1/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_1/strided_slice_1/stack_1�
0decoder/decoder_conv_t_1/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_1/strided_slice_1/stack_2�
(decoder/decoder_conv_t_1/strided_slice_1StridedSlice'decoder/decoder_conv_t_1/stack:output:07decoder/decoder_conv_t_1/strided_slice_1/stack:output:09decoder/decoder_conv_t_1/strided_slice_1/stack_1:output:09decoder/decoder_conv_t_1/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2*
(decoder/decoder_conv_t_1/strided_slice_1�
8decoder/decoder_conv_t_1/conv2d_transpose/ReadVariableOpReadVariableOpAdecoder_decoder_conv_t_1_conv2d_transpose_readvariableop_resource*&
_output_shapes
:@@*
dtype02:
8decoder/decoder_conv_t_1/conv2d_transpose/ReadVariableOp�
)decoder/decoder_conv_t_1/conv2d_transposeConv2DBackpropInput'decoder/decoder_conv_t_1/stack:output:0@decoder/decoder_conv_t_1/conv2d_transpose/ReadVariableOp:value:0-decoder/leaky_re_lu_4/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������22@*
paddingSAME*
strides
2+
)decoder/decoder_conv_t_1/conv2d_transpose�
/decoder/decoder_conv_t_1/BiasAdd/ReadVariableOpReadVariableOp8decoder_decoder_conv_t_1_biasadd_readvariableop_resource*
_output_shapes
:@*
dtype021
/decoder/decoder_conv_t_1/BiasAdd/ReadVariableOp�
 decoder/decoder_conv_t_1/BiasAddBiasAdd2decoder/decoder_conv_t_1/conv2d_transpose:output:07decoder/decoder_conv_t_1/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������22@2"
 decoder/decoder_conv_t_1/BiasAdd�
decoder/leaky_re_lu_5/LeakyRelu	LeakyRelu)decoder/decoder_conv_t_1/BiasAdd:output:0*/
_output_shapes
:���������22@*
alpha%���>2!
decoder/leaky_re_lu_5/LeakyRelu�
decoder/decoder_conv_t_2/ShapeShape-decoder/leaky_re_lu_5/LeakyRelu:activations:0*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_2/Shape�
,decoder/decoder_conv_t_2/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2.
,decoder/decoder_conv_t_2/strided_slice/stack�
.decoder/decoder_conv_t_2/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_2/strided_slice/stack_1�
.decoder/decoder_conv_t_2/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_2/strided_slice/stack_2�
&decoder/decoder_conv_t_2/strided_sliceStridedSlice'decoder/decoder_conv_t_2/Shape:output:05decoder/decoder_conv_t_2/strided_slice/stack:output:07decoder/decoder_conv_t_2/strided_slice/stack_1:output:07decoder/decoder_conv_t_2/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2(
&decoder/decoder_conv_t_2/strided_slice�
 decoder/decoder_conv_t_2/stack/1Const*
_output_shapes
: *
dtype0*
value	B :d2"
 decoder/decoder_conv_t_2/stack/1�
 decoder/decoder_conv_t_2/stack/2Const*
_output_shapes
: *
dtype0*
value	B :d2"
 decoder/decoder_conv_t_2/stack/2�
 decoder/decoder_conv_t_2/stack/3Const*
_output_shapes
: *
dtype0*
value	B : 2"
 decoder/decoder_conv_t_2/stack/3�
decoder/decoder_conv_t_2/stackPack/decoder/decoder_conv_t_2/strided_slice:output:0)decoder/decoder_conv_t_2/stack/1:output:0)decoder/decoder_conv_t_2/stack/2:output:0)decoder/decoder_conv_t_2/stack/3:output:0*
N*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_2/stack�
.decoder/decoder_conv_t_2/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 20
.decoder/decoder_conv_t_2/strided_slice_1/stack�
0decoder/decoder_conv_t_2/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_2/strided_slice_1/stack_1�
0decoder/decoder_conv_t_2/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_2/strided_slice_1/stack_2�
(decoder/decoder_conv_t_2/strided_slice_1StridedSlice'decoder/decoder_conv_t_2/stack:output:07decoder/decoder_conv_t_2/strided_slice_1/stack:output:09decoder/decoder_conv_t_2/strided_slice_1/stack_1:output:09decoder/decoder_conv_t_2/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2*
(decoder/decoder_conv_t_2/strided_slice_1�
8decoder/decoder_conv_t_2/conv2d_transpose/ReadVariableOpReadVariableOpAdecoder_decoder_conv_t_2_conv2d_transpose_readvariableop_resource*&
_output_shapes
: @*
dtype02:
8decoder/decoder_conv_t_2/conv2d_transpose/ReadVariableOp�
)decoder/decoder_conv_t_2/conv2d_transposeConv2DBackpropInput'decoder/decoder_conv_t_2/stack:output:0@decoder/decoder_conv_t_2/conv2d_transpose/ReadVariableOp:value:0-decoder/leaky_re_lu_5/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������dd *
paddingSAME*
strides
2+
)decoder/decoder_conv_t_2/conv2d_transpose�
/decoder/decoder_conv_t_2/BiasAdd/ReadVariableOpReadVariableOp8decoder_decoder_conv_t_2_biasadd_readvariableop_resource*
_output_shapes
: *
dtype021
/decoder/decoder_conv_t_2/BiasAdd/ReadVariableOp�
 decoder/decoder_conv_t_2/BiasAddBiasAdd2decoder/decoder_conv_t_2/conv2d_transpose:output:07decoder/decoder_conv_t_2/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������dd 2"
 decoder/decoder_conv_t_2/BiasAdd�
decoder/leaky_re_lu_6/LeakyRelu	LeakyRelu)decoder/decoder_conv_t_2/BiasAdd:output:0*/
_output_shapes
:���������dd *
alpha%���>2!
decoder/leaky_re_lu_6/LeakyRelu�
decoder/decoder_conv_t_3/ShapeShape-decoder/leaky_re_lu_6/LeakyRelu:activations:0*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_3/Shape�
,decoder/decoder_conv_t_3/strided_slice/stackConst*
_output_shapes
:*
dtype0*
valueB: 2.
,decoder/decoder_conv_t_3/strided_slice/stack�
.decoder/decoder_conv_t_3/strided_slice/stack_1Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_3/strided_slice/stack_1�
.decoder/decoder_conv_t_3/strided_slice/stack_2Const*
_output_shapes
:*
dtype0*
valueB:20
.decoder/decoder_conv_t_3/strided_slice/stack_2�
&decoder/decoder_conv_t_3/strided_sliceStridedSlice'decoder/decoder_conv_t_3/Shape:output:05decoder/decoder_conv_t_3/strided_slice/stack:output:07decoder/decoder_conv_t_3/strided_slice/stack_1:output:07decoder/decoder_conv_t_3/strided_slice/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2(
&decoder/decoder_conv_t_3/strided_slice�
 decoder/decoder_conv_t_3/stack/1Const*
_output_shapes
: *
dtype0*
value	B :d2"
 decoder/decoder_conv_t_3/stack/1�
 decoder/decoder_conv_t_3/stack/2Const*
_output_shapes
: *
dtype0*
value	B :d2"
 decoder/decoder_conv_t_3/stack/2�
 decoder/decoder_conv_t_3/stack/3Const*
_output_shapes
: *
dtype0*
value	B :2"
 decoder/decoder_conv_t_3/stack/3�
decoder/decoder_conv_t_3/stackPack/decoder/decoder_conv_t_3/strided_slice:output:0)decoder/decoder_conv_t_3/stack/1:output:0)decoder/decoder_conv_t_3/stack/2:output:0)decoder/decoder_conv_t_3/stack/3:output:0*
N*
T0*
_output_shapes
:2 
decoder/decoder_conv_t_3/stack�
.decoder/decoder_conv_t_3/strided_slice_1/stackConst*
_output_shapes
:*
dtype0*
valueB: 20
.decoder/decoder_conv_t_3/strided_slice_1/stack�
0decoder/decoder_conv_t_3/strided_slice_1/stack_1Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_3/strided_slice_1/stack_1�
0decoder/decoder_conv_t_3/strided_slice_1/stack_2Const*
_output_shapes
:*
dtype0*
valueB:22
0decoder/decoder_conv_t_3/strided_slice_1/stack_2�
(decoder/decoder_conv_t_3/strided_slice_1StridedSlice'decoder/decoder_conv_t_3/stack:output:07decoder/decoder_conv_t_3/strided_slice_1/stack:output:09decoder/decoder_conv_t_3/strided_slice_1/stack_1:output:09decoder/decoder_conv_t_3/strided_slice_1/stack_2:output:0*
Index0*
T0*
_output_shapes
: *
shrink_axis_mask2*
(decoder/decoder_conv_t_3/strided_slice_1�
8decoder/decoder_conv_t_3/conv2d_transpose/ReadVariableOpReadVariableOpAdecoder_decoder_conv_t_3_conv2d_transpose_readvariableop_resource*&
_output_shapes
: *
dtype02:
8decoder/decoder_conv_t_3/conv2d_transpose/ReadVariableOp�
)decoder/decoder_conv_t_3/conv2d_transposeConv2DBackpropInput'decoder/decoder_conv_t_3/stack:output:0@decoder/decoder_conv_t_3/conv2d_transpose/ReadVariableOp:value:0-decoder/leaky_re_lu_6/LeakyRelu:activations:0*
T0*/
_output_shapes
:���������dd*
paddingSAME*
strides
2+
)decoder/decoder_conv_t_3/conv2d_transpose�
/decoder/decoder_conv_t_3/BiasAdd/ReadVariableOpReadVariableOp8decoder_decoder_conv_t_3_biasadd_readvariableop_resource*
_output_shapes
:*
dtype021
/decoder/decoder_conv_t_3/BiasAdd/ReadVariableOp�
 decoder/decoder_conv_t_3/BiasAddBiasAdd2decoder/decoder_conv_t_3/conv2d_transpose:output:07decoder/decoder_conv_t_3/BiasAdd/ReadVariableOp:value:0*
T0*/
_output_shapes
:���������dd2"
 decoder/decoder_conv_t_3/BiasAdd�
decoder/activation/SigmoidSigmoid)decoder/decoder_conv_t_3/BiasAdd:output:0*
T0*/
_output_shapes
:���������dd2
decoder/activation/Sigmoid�
IdentityIdentitydecoder/activation/Sigmoid:y:00^decoder/decoder_conv_t_0/BiasAdd/ReadVariableOp9^decoder/decoder_conv_t_0/conv2d_transpose/ReadVariableOp0^decoder/decoder_conv_t_1/BiasAdd/ReadVariableOp9^decoder/decoder_conv_t_1/conv2d_transpose/ReadVariableOp0^decoder/decoder_conv_t_2/BiasAdd/ReadVariableOp9^decoder/decoder_conv_t_2/conv2d_transpose/ReadVariableOp0^decoder/decoder_conv_t_3/BiasAdd/ReadVariableOp9^decoder/decoder_conv_t_3/conv2d_transpose/ReadVariableOp%^decoder/dense/BiasAdd/ReadVariableOp$^decoder/dense/MatMul/ReadVariableOp*
T0*/
_output_shapes
:���������dd2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 2b
/decoder/decoder_conv_t_0/BiasAdd/ReadVariableOp/decoder/decoder_conv_t_0/BiasAdd/ReadVariableOp2t
8decoder/decoder_conv_t_0/conv2d_transpose/ReadVariableOp8decoder/decoder_conv_t_0/conv2d_transpose/ReadVariableOp2b
/decoder/decoder_conv_t_1/BiasAdd/ReadVariableOp/decoder/decoder_conv_t_1/BiasAdd/ReadVariableOp2t
8decoder/decoder_conv_t_1/conv2d_transpose/ReadVariableOp8decoder/decoder_conv_t_1/conv2d_transpose/ReadVariableOp2b
/decoder/decoder_conv_t_2/BiasAdd/ReadVariableOp/decoder/decoder_conv_t_2/BiasAdd/ReadVariableOp2t
8decoder/decoder_conv_t_2/conv2d_transpose/ReadVariableOp8decoder/decoder_conv_t_2/conv2d_transpose/ReadVariableOp2b
/decoder/decoder_conv_t_3/BiasAdd/ReadVariableOp/decoder/decoder_conv_t_3/BiasAdd/ReadVariableOp2t
8decoder/decoder_conv_t_3/conv2d_transpose/ReadVariableOp8decoder/decoder_conv_t_3/conv2d_transpose/ReadVariableOp2L
$decoder/dense/BiasAdd/ReadVariableOp$decoder/dense/BiasAdd/ReadVariableOp2J
#decoder/dense/MatMul/ReadVariableOp#decoder/dense/MatMul/ReadVariableOp:V R
'
_output_shapes
:���������

'
_user_specified_namedecoder_input
�
e
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_222783

inputs
identity~
	LeakyRelu	LeakyReluinputs*A
_output_shapes/
-:+���������������������������@*
alpha%���>2
	LeakyRelu�
IdentityIdentityLeakyRelu:activations:0*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*@
_input_shapes/
-:+���������������������������@:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�

�
$__inference_signature_wrapper_223077
decoder_input
unknown:

��
	unknown_0:
��#
	unknown_1:@@
	unknown_2:@#
	unknown_3:@@
	unknown_4:@#
	unknown_5: @
	unknown_6: #
	unknown_7: 
	unknown_8:
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCalldecoder_inputunknown	unknown_0	unknown_1	unknown_2	unknown_3	unknown_4	unknown_5	unknown_6	unknown_7	unknown_8*
Tin
2*
Tout
2*
_collective_manager_ids
 */
_output_shapes
:���������dd*,
_read_only_resource_inputs

	
*-
config_proto

CPU

GPU 2J 8� **
f%R#
!__inference__wrapped_model_2225462
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*/
_output_shapes
:���������dd2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*:
_input_shapes)
':���������
: : : : : : : : : : 22
StatefulPartitionedCallStatefulPartitionedCall:V R
'
_output_shapes
:���������

'
_user_specified_namedecoder_input
�
�
1__inference_decoder_conv_t_1_layer_call_fn_222634

inputs!
unknown:@@
	unknown_0:@
identity��StatefulPartitionedCall�
StatefulPartitionedCallStatefulPartitionedCallinputsunknown	unknown_0*
Tin
2*
Tout
2*
_collective_manager_ids
 *A
_output_shapes/
-:+���������������������������@*$
_read_only_resource_inputs
*-
config_proto

CPU

GPU 2J 8� *U
fPRN
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_2226242
StatefulPartitionedCall�
IdentityIdentity StatefulPartitionedCall:output:0^StatefulPartitionedCall*
T0*A
_output_shapes/
-:+���������������������������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*D
_input_shapes3
1:+���������������������������@: : 22
StatefulPartitionedCallStatefulPartitionedCall:i e
A
_output_shapes/
-:+���������������������������@
 
_user_specified_nameinputs
�
D
(__inference_reshape_layer_call_fn_223365

inputs
identity�
PartitionedCallPartitionedCallinputs*
Tin
2*
Tout
2*
_collective_manager_ids
 */
_output_shapes
:���������@* 
_read_only_resource_inputs
 *-
config_proto

CPU

GPU 2J 8� *L
fGRE
C__inference_reshape_layer_call_and_return_conditional_losses_2227592
PartitionedCallt
IdentityIdentityPartitionedCall:output:0*
T0*/
_output_shapes
:���������@2

Identity"
identityIdentity:output:0*(
_construction_contextkEagerRuntime*(
_input_shapes
:�����������:Q M
)
_output_shapes
:�����������
 
_user_specified_nameinputs"�L
saver_filename:0StatefulPartitionedCall_1:0StatefulPartitionedCall_28"
saved_model_main_op

NoOp*>
__saved_model_init_op%#
__saved_model_init_op

NoOp*�
serving_default�
G
decoder_input6
serving_default_decoder_input:0���������
F

activation8
StatefulPartitionedCall:0���������ddtensorflow/serving/predict:��
�]
layer-0
layer_with_weights-0
layer-1
layer-2
layer_with_weights-1
layer-3
layer-4
layer_with_weights-2
layer-5
layer-6
layer_with_weights-3
layer-7
	layer-8

layer_with_weights-4

layer-9
layer-10
	variables
regularization_losses
trainable_variables
	keras_api

signatures
z_default_save_signature
*{&call_and_return_all_conditional_losses
|__call__"�Y
_tf_keras_network�Y{"name": "decoder", "trainable": true, "expects_training_arg": true, "dtype": "float32", "batch_input_shape": null, "must_restore_from_config": false, "class_name": "Functional", "config": {"name": "decoder", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 10]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "decoder_input"}, "name": "decoder_input", "inbound_nodes": []}, {"class_name": "Dense", "config": {"name": "dense", "trainable": true, "dtype": "float32", "units": 40000, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null}, "name": "dense", "inbound_nodes": [[["decoder_input", 0, 0, {}]]]}, {"class_name": "Reshape", "config": {"name": "reshape", "trainable": true, "dtype": "float32", "target_shape": {"class_name": "__tuple__", "items": [25, 25, 64]}}, "name": "reshape", "inbound_nodes": [[["dense", 0, 0, {}]]]}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_0", "trainable": true, "dtype": "float32", "filters": 64, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [1, 1]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_0", "inbound_nodes": [[["reshape", 0, 0, {}]]]}, {"class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_4", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "name": "leaky_re_lu_4", "inbound_nodes": [[["decoder_conv_t_0", 0, 0, {}]]]}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_1", "trainable": true, "dtype": "float32", "filters": 64, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [2, 2]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_1", "inbound_nodes": [[["leaky_re_lu_4", 0, 0, {}]]]}, {"class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_5", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "name": "leaky_re_lu_5", "inbound_nodes": [[["decoder_conv_t_1", 0, 0, {}]]]}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_2", "trainable": true, "dtype": "float32", "filters": 32, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [2, 2]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_2", "inbound_nodes": [[["leaky_re_lu_5", 0, 0, {}]]]}, {"class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_6", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "name": "leaky_re_lu_6", "inbound_nodes": [[["decoder_conv_t_2", 0, 0, {}]]]}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_3", "trainable": true, "dtype": "float32", "filters": 3, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [1, 1]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_3", "inbound_nodes": [[["leaky_re_lu_6", 0, 0, {}]]]}, {"class_name": "Activation", "config": {"name": "activation", "trainable": true, "dtype": "float32", "activation": "sigmoid"}, "name": "activation", "inbound_nodes": [[["decoder_conv_t_3", 0, 0, {}]]]}], "input_layers": [["decoder_input", 0, 0]], "output_layers": [["activation", 0, 0]]}, "shared_object_id": 21, "input_spec": [{"class_name": "InputSpec", "config": {"dtype": null, "shape": {"class_name": "__tuple__", "items": [null, 10]}, "ndim": 2, "max_ndim": null, "min_ndim": null, "axes": {}}}], "build_input_shape": {"class_name": "TensorShape", "items": [null, 10]}, "is_graph_network": true, "save_spec": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null, 10]}, "float32", "decoder_input"]}, "keras_version": "2.5.0", "backend": "tensorflow", "model_config": {"class_name": "Functional", "config": {"name": "decoder", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 10]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "decoder_input"}, "name": "decoder_input", "inbound_nodes": [], "shared_object_id": 0}, {"class_name": "Dense", "config": {"name": "dense", "trainable": true, "dtype": "float32", "units": 40000, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 1}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 2}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null}, "name": "dense", "inbound_nodes": [[["decoder_input", 0, 0, {}]]], "shared_object_id": 3}, {"class_name": "Reshape", "config": {"name": "reshape", "trainable": true, "dtype": "float32", "target_shape": {"class_name": "__tuple__", "items": [25, 25, 64]}}, "name": "reshape", "inbound_nodes": [[["dense", 0, 0, {}]]], "shared_object_id": 4}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_0", "trainable": true, "dtype": "float32", "filters": 64, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [1, 1]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 5}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 6}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_0", "inbound_nodes": [[["reshape", 0, 0, {}]]], "shared_object_id": 7}, {"class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_4", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "name": "leaky_re_lu_4", "inbound_nodes": [[["decoder_conv_t_0", 0, 0, {}]]], "shared_object_id": 8}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_1", "trainable": true, "dtype": "float32", "filters": 64, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [2, 2]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 9}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 10}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_1", "inbound_nodes": [[["leaky_re_lu_4", 0, 0, {}]]], "shared_object_id": 11}, {"class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_5", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "name": "leaky_re_lu_5", "inbound_nodes": [[["decoder_conv_t_1", 0, 0, {}]]], "shared_object_id": 12}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_2", "trainable": true, "dtype": "float32", "filters": 32, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [2, 2]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 13}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 14}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_2", "inbound_nodes": [[["leaky_re_lu_5", 0, 0, {}]]], "shared_object_id": 15}, {"class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_6", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "name": "leaky_re_lu_6", "inbound_nodes": [[["decoder_conv_t_2", 0, 0, {}]]], "shared_object_id": 16}, {"class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_3", "trainable": true, "dtype": "float32", "filters": 3, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [1, 1]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 17}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 18}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "name": "decoder_conv_t_3", "inbound_nodes": [[["leaky_re_lu_6", 0, 0, {}]]], "shared_object_id": 19}, {"class_name": "Activation", "config": {"name": "activation", "trainable": true, "dtype": "float32", "activation": "sigmoid"}, "name": "activation", "inbound_nodes": [[["decoder_conv_t_3", 0, 0, {}]]], "shared_object_id": 20}], "input_layers": [["decoder_input", 0, 0]], "output_layers": [["activation", 0, 0]]}}}
�"�
_tf_keras_input_layer�{"class_name": "InputLayer", "name": "decoder_input", "dtype": "float32", "sparse": false, "ragged": false, "batch_input_shape": {"class_name": "__tuple__", "items": [null, 10]}, "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 10]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "decoder_input"}}
�	

kernel
bias
	variables
regularization_losses
trainable_variables
	keras_api
*}&call_and_return_all_conditional_losses
~__call__"�
_tf_keras_layer�{"name": "dense", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "Dense", "config": {"name": "dense", "trainable": true, "dtype": "float32", "units": 40000, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 1}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 2}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null}, "inbound_nodes": [[["decoder_input", 0, 0, {}]]], "shared_object_id": 3, "input_spec": {"class_name": "InputSpec", "config": {"dtype": null, "shape": null, "ndim": null, "max_ndim": null, "min_ndim": 2, "axes": {"-1": 10}}, "shared_object_id": 23}, "build_input_shape": {"class_name": "TensorShape", "items": [null, 10]}}
�
	variables
regularization_losses
trainable_variables
	keras_api
*&call_and_return_all_conditional_losses
�__call__"�
_tf_keras_layer�{"name": "reshape", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "Reshape", "config": {"name": "reshape", "trainable": true, "dtype": "float32", "target_shape": {"class_name": "__tuple__", "items": [25, 25, 64]}}, "inbound_nodes": [[["dense", 0, 0, {}]]], "shared_object_id": 4}
�

kernel
bias
	variables
regularization_losses
trainable_variables
 	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�

_tf_keras_layer�	{"name": "decoder_conv_t_0", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_0", "trainable": true, "dtype": "float32", "filters": 64, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [1, 1]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 5}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 6}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "inbound_nodes": [[["reshape", 0, 0, {}]]], "shared_object_id": 7, "input_spec": {"class_name": "InputSpec", "config": {"dtype": null, "shape": null, "ndim": 4, "max_ndim": null, "min_ndim": null, "axes": {"-1": 64}}, "shared_object_id": 24}, "build_input_shape": {"class_name": "TensorShape", "items": [null, 25, 25, 64]}}
�
!	variables
"regularization_losses
#trainable_variables
$	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�
_tf_keras_layer�{"name": "leaky_re_lu_4", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_4", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "inbound_nodes": [[["decoder_conv_t_0", 0, 0, {}]]], "shared_object_id": 8}
�

%kernel
&bias
'	variables
(regularization_losses
)trainable_variables
*	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�

_tf_keras_layer�	{"name": "decoder_conv_t_1", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_1", "trainable": true, "dtype": "float32", "filters": 64, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [2, 2]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 9}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 10}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "inbound_nodes": [[["leaky_re_lu_4", 0, 0, {}]]], "shared_object_id": 11, "input_spec": {"class_name": "InputSpec", "config": {"dtype": null, "shape": null, "ndim": 4, "max_ndim": null, "min_ndim": null, "axes": {"-1": 64}}, "shared_object_id": 25}, "build_input_shape": {"class_name": "TensorShape", "items": [null, 25, 25, 64]}}
�
+	variables
,regularization_losses
-trainable_variables
.	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�
_tf_keras_layer�{"name": "leaky_re_lu_5", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_5", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "inbound_nodes": [[["decoder_conv_t_1", 0, 0, {}]]], "shared_object_id": 12}
�

/kernel
0bias
1	variables
2regularization_losses
3trainable_variables
4	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�

_tf_keras_layer�	{"name": "decoder_conv_t_2", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_2", "trainable": true, "dtype": "float32", "filters": 32, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [2, 2]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 13}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 14}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "inbound_nodes": [[["leaky_re_lu_5", 0, 0, {}]]], "shared_object_id": 15, "input_spec": {"class_name": "InputSpec", "config": {"dtype": null, "shape": null, "ndim": 4, "max_ndim": null, "min_ndim": null, "axes": {"-1": 64}}, "shared_object_id": 26}, "build_input_shape": {"class_name": "TensorShape", "items": [null, 50, 50, 64]}}
�
5	variables
6regularization_losses
7trainable_variables
8	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�
_tf_keras_layer�{"name": "leaky_re_lu_6", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "LeakyReLU", "config": {"name": "leaky_re_lu_6", "trainable": true, "dtype": "float32", "alpha": 0.30000001192092896}, "inbound_nodes": [[["decoder_conv_t_2", 0, 0, {}]]], "shared_object_id": 16}
�

9kernel
:bias
;	variables
<regularization_losses
=trainable_variables
>	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�

_tf_keras_layer�	{"name": "decoder_conv_t_3", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "Conv2DTranspose", "config": {"name": "decoder_conv_t_3", "trainable": true, "dtype": "float32", "filters": 3, "kernel_size": {"class_name": "__tuple__", "items": [3, 3]}, "strides": {"class_name": "__tuple__", "items": [1, 1]}, "padding": "same", "data_format": "channels_last", "dilation_rate": {"class_name": "__tuple__", "items": [1, 1]}, "groups": 1, "activation": "linear", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}, "shared_object_id": 17}, "bias_initializer": {"class_name": "Zeros", "config": {}, "shared_object_id": 18}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null, "output_padding": null}, "inbound_nodes": [[["leaky_re_lu_6", 0, 0, {}]]], "shared_object_id": 19, "input_spec": {"class_name": "InputSpec", "config": {"dtype": null, "shape": null, "ndim": 4, "max_ndim": null, "min_ndim": null, "axes": {"-1": 32}}, "shared_object_id": 27}, "build_input_shape": {"class_name": "TensorShape", "items": [null, 100, 100, 32]}}
�
?	variables
@regularization_losses
Atrainable_variables
B	keras_api
+�&call_and_return_all_conditional_losses
�__call__"�
_tf_keras_layer�{"name": "activation", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "class_name": "Activation", "config": {"name": "activation", "trainable": true, "dtype": "float32", "activation": "sigmoid"}, "inbound_nodes": [[["decoder_conv_t_3", 0, 0, {}]]], "shared_object_id": 20}
f
0
1
2
3
%4
&5
/6
07
98
:9"
trackable_list_wrapper
 "
trackable_list_wrapper
f
0
1
2
3
%4
&5
/6
07
98
:9"
trackable_list_wrapper
�
Cmetrics
Dlayer_metrics
	variables
regularization_losses
Elayer_regularization_losses
Fnon_trainable_variables
trainable_variables

Glayers
|__call__
z_default_save_signature
*{&call_and_return_all_conditional_losses
&{"call_and_return_conditional_losses"
_generic_user_object
-
�serving_default"
signature_map
 :

��2dense/kernel
:��2
dense/bias
.
0
1"
trackable_list_wrapper
 "
trackable_list_wrapper
.
0
1"
trackable_list_wrapper
�
Hmetrics
Ilayer_metrics
	variables
regularization_losses
Jlayer_regularization_losses
Knon_trainable_variables
trainable_variables

Llayers
~__call__
*}&call_and_return_all_conditional_losses
&}"call_and_return_conditional_losses"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
�
Mmetrics
Nlayer_metrics
	variables
regularization_losses
Olayer_regularization_losses
Pnon_trainable_variables
trainable_variables

Qlayers
�__call__
*&call_and_return_all_conditional_losses
&"call_and_return_conditional_losses"
_generic_user_object
1:/@@2decoder_conv_t_0/kernel
#:!@2decoder_conv_t_0/bias
.
0
1"
trackable_list_wrapper
 "
trackable_list_wrapper
.
0
1"
trackable_list_wrapper
�
Rmetrics
Slayer_metrics
	variables
regularization_losses
Tlayer_regularization_losses
Unon_trainable_variables
trainable_variables

Vlayers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
�
Wmetrics
Xlayer_metrics
!	variables
"regularization_losses
Ylayer_regularization_losses
Znon_trainable_variables
#trainable_variables

[layers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
1:/@@2decoder_conv_t_1/kernel
#:!@2decoder_conv_t_1/bias
.
%0
&1"
trackable_list_wrapper
 "
trackable_list_wrapper
.
%0
&1"
trackable_list_wrapper
�
\metrics
]layer_metrics
'	variables
(regularization_losses
^layer_regularization_losses
_non_trainable_variables
)trainable_variables

`layers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
�
ametrics
blayer_metrics
+	variables
,regularization_losses
clayer_regularization_losses
dnon_trainable_variables
-trainable_variables

elayers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
1:/ @2decoder_conv_t_2/kernel
#:! 2decoder_conv_t_2/bias
.
/0
01"
trackable_list_wrapper
 "
trackable_list_wrapper
.
/0
01"
trackable_list_wrapper
�
fmetrics
glayer_metrics
1	variables
2regularization_losses
hlayer_regularization_losses
inon_trainable_variables
3trainable_variables

jlayers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
�
kmetrics
llayer_metrics
5	variables
6regularization_losses
mlayer_regularization_losses
nnon_trainable_variables
7trainable_variables

olayers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
1:/ 2decoder_conv_t_3/kernel
#:!2decoder_conv_t_3/bias
.
90
:1"
trackable_list_wrapper
 "
trackable_list_wrapper
.
90
:1"
trackable_list_wrapper
�
pmetrics
qlayer_metrics
;	variables
<regularization_losses
rlayer_regularization_losses
snon_trainable_variables
=trainable_variables

tlayers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
�
umetrics
vlayer_metrics
?	variables
@regularization_losses
wlayer_regularization_losses
xnon_trainable_variables
Atrainable_variables

ylayers
�__call__
+�&call_and_return_all_conditional_losses
'�"call_and_return_conditional_losses"
_generic_user_object
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
n
0
1
2
3
4
5
6
7
	8

9
10"
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_dict_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
 "
trackable_list_wrapper
�2�
!__inference__wrapped_model_222546�
���
FullArgSpec
args� 
varargsjargs
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *,�)
'�$
decoder_input���������

�2�
C__inference_decoder_layer_call_and_return_conditional_losses_223177
C__inference_decoder_layer_call_and_return_conditional_losses_223277
C__inference_decoder_layer_call_and_return_conditional_losses_223016
C__inference_decoder_layer_call_and_return_conditional_losses_223050�
���
FullArgSpec1
args)�&
jself
jinputs

jtraining
jmask
varargs
 
varkw
 
defaults�
p 

 

kwonlyargs� 
kwonlydefaults� 
annotations� *
 
�2�
(__inference_decoder_layer_call_fn_222833
(__inference_decoder_layer_call_fn_223302
(__inference_decoder_layer_call_fn_223327
(__inference_decoder_layer_call_fn_222982�
���
FullArgSpec1
args)�&
jself
jinputs

jtraining
jmask
varargs
 
varkw
 
defaults�
p 

 

kwonlyargs� 
kwonlydefaults� 
annotations� *
 
�2�
A__inference_dense_layer_call_and_return_conditional_losses_223337�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
&__inference_dense_layer_call_fn_223346�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
C__inference_reshape_layer_call_and_return_conditional_losses_223360�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
(__inference_reshape_layer_call_fn_223365�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_222580�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+���������������������������@
�2�
1__inference_decoder_conv_t_0_layer_call_fn_222590�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+���������������������������@
�2�
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_223370�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
.__inference_leaky_re_lu_4_layer_call_fn_223375�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_222624�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+���������������������������@
�2�
1__inference_decoder_conv_t_1_layer_call_fn_222634�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+���������������������������@
�2�
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_223380�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
.__inference_leaky_re_lu_5_layer_call_fn_223385�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_222668�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+���������������������������@
�2�
1__inference_decoder_conv_t_2_layer_call_fn_222678�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+���������������������������@
�2�
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_223390�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
.__inference_leaky_re_lu_6_layer_call_fn_223395�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_222712�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+��������������������������� 
�2�
1__inference_decoder_conv_t_3_layer_call_fn_222722�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *7�4
2�/+��������������������������� 
�2�
F__inference_activation_layer_call_and_return_conditional_losses_223400�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�2�
+__inference_activation_layer_call_fn_223405�
���
FullArgSpec
args�
jself
jinputs
varargs
 
varkw
 
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 
�B�
$__inference_signature_wrapper_223077decoder_input"�
���
FullArgSpec
args� 
varargs
 
varkwjkwargs
defaults
 

kwonlyargs� 
kwonlydefaults
 
annotations� *
 �
!__inference__wrapped_model_222546�
%&/09:6�3
,�)
'�$
decoder_input���������

� "?�<
:

activation,�)

activation���������dd�
F__inference_activation_layer_call_and_return_conditional_losses_223400�I�F
?�<
:�7
inputs+���������������������������
� "?�<
5�2
0+���������������������������
� �
+__inference_activation_layer_call_fn_223405I�F
?�<
:�7
inputs+���������������������������
� "2�/+����������������������������
L__inference_decoder_conv_t_0_layer_call_and_return_conditional_losses_222580�I�F
?�<
:�7
inputs+���������������������������@
� "?�<
5�2
0+���������������������������@
� �
1__inference_decoder_conv_t_0_layer_call_fn_222590�I�F
?�<
:�7
inputs+���������������������������@
� "2�/+���������������������������@�
L__inference_decoder_conv_t_1_layer_call_and_return_conditional_losses_222624�%&I�F
?�<
:�7
inputs+���������������������������@
� "?�<
5�2
0+���������������������������@
� �
1__inference_decoder_conv_t_1_layer_call_fn_222634�%&I�F
?�<
:�7
inputs+���������������������������@
� "2�/+���������������������������@�
L__inference_decoder_conv_t_2_layer_call_and_return_conditional_losses_222668�/0I�F
?�<
:�7
inputs+���������������������������@
� "?�<
5�2
0+��������������������������� 
� �
1__inference_decoder_conv_t_2_layer_call_fn_222678�/0I�F
?�<
:�7
inputs+���������������������������@
� "2�/+��������������������������� �
L__inference_decoder_conv_t_3_layer_call_and_return_conditional_losses_222712�9:I�F
?�<
:�7
inputs+��������������������������� 
� "?�<
5�2
0+���������������������������
� �
1__inference_decoder_conv_t_3_layer_call_fn_222722�9:I�F
?�<
:�7
inputs+��������������������������� 
� "2�/+����������������������������
C__inference_decoder_layer_call_and_return_conditional_losses_223016�
%&/09:>�;
4�1
'�$
decoder_input���������

p 

 
� "?�<
5�2
0+���������������������������
� �
C__inference_decoder_layer_call_and_return_conditional_losses_223050�
%&/09:>�;
4�1
'�$
decoder_input���������

p

 
� "?�<
5�2
0+���������������������������
� �
C__inference_decoder_layer_call_and_return_conditional_losses_223177t
%&/09:7�4
-�*
 �
inputs���������

p 

 
� "-�*
#� 
0���������dd
� �
C__inference_decoder_layer_call_and_return_conditional_losses_223277t
%&/09:7�4
-�*
 �
inputs���������

p

 
� "-�*
#� 
0���������dd
� �
(__inference_decoder_layer_call_fn_222833�
%&/09:>�;
4�1
'�$
decoder_input���������

p 

 
� "2�/+����������������������������
(__inference_decoder_layer_call_fn_222982�
%&/09:>�;
4�1
'�$
decoder_input���������

p

 
� "2�/+����������������������������
(__inference_decoder_layer_call_fn_223302y
%&/09:7�4
-�*
 �
inputs���������

p 

 
� "2�/+����������������������������
(__inference_decoder_layer_call_fn_223327y
%&/09:7�4
-�*
 �
inputs���������

p

 
� "2�/+����������������������������
A__inference_dense_layer_call_and_return_conditional_losses_223337^/�,
%�"
 �
inputs���������

� "'�$
�
0�����������
� {
&__inference_dense_layer_call_fn_223346Q/�,
%�"
 �
inputs���������

� "�������������
I__inference_leaky_re_lu_4_layer_call_and_return_conditional_losses_223370�I�F
?�<
:�7
inputs+���������������������������@
� "?�<
5�2
0+���������������������������@
� �
.__inference_leaky_re_lu_4_layer_call_fn_223375I�F
?�<
:�7
inputs+���������������������������@
� "2�/+���������������������������@�
I__inference_leaky_re_lu_5_layer_call_and_return_conditional_losses_223380�I�F
?�<
:�7
inputs+���������������������������@
� "?�<
5�2
0+���������������������������@
� �
.__inference_leaky_re_lu_5_layer_call_fn_223385I�F
?�<
:�7
inputs+���������������������������@
� "2�/+���������������������������@�
I__inference_leaky_re_lu_6_layer_call_and_return_conditional_losses_223390�I�F
?�<
:�7
inputs+��������������������������� 
� "?�<
5�2
0+��������������������������� 
� �
.__inference_leaky_re_lu_6_layer_call_fn_223395I�F
?�<
:�7
inputs+��������������������������� 
� "2�/+��������������������������� �
C__inference_reshape_layer_call_and_return_conditional_losses_223360b1�.
'�$
"�
inputs�����������
� "-�*
#� 
0���������@
� �
(__inference_reshape_layer_call_fn_223365U1�.
'�$
"�
inputs�����������
� " ����������@�
$__inference_signature_wrapper_223077�
%&/09:G�D
� 
=�:
8
decoder_input'�$
decoder_input���������
"?�<
:

activation,�)

activation���������dd